const { readFile, writeFile, access, watch, constants } = require('fs')
const EventEmitter = require('events')
const jsonPatch = require('json-patch')
const jsonPointer = require('jsonpointer')

const SERIALIZE = Symbol('serialize'),
      DESERIALIZE = Symbol('deserialize'),
      STORE = Symbol('store')

const {
  F_OK,
  R_OK,
  W_OK
} = constants

function _emitSafe(...args) {
  return new Promise(done => {
    process.nextTick(() => this.emit(...args))

    done()
  })
}

function checkAccess(filename, mode) {
  return new Promise((done, fail) => {
    access(filename, mode, err => err ? fail(err) : done(filename))
  })
}

function read(filename) {
  return new Promise((done, fail) => {
    readFile(filename, (err, data) => {
      if(err) {
        fail(err)
      }

      try {
        done(this[DESERIALIZE](data))
      } catch(err) {
        fail(err)
      }
    })
  })
}

function write(filename, data) {
  return new Promise((done, fail) => {
    writeFile(filename, this[SERIALIZE](data), err => {
      err ? fail(err) : done()
    })
  })
}

function _sync(deferred) {
  if(this._pesisted && !this._syncing) {
    this._syncing = false

    return deferred
      .then(data => this[STORE] = data)
      .then(() => {
        this._syncing = false
        return _emitSafe.call(this, 'synced')
      })
      .catch(err => {
        this._syncing = false
        throw err
      })
  } else {
    return Promise.resolve()
  }
}

class FileStore extends EventEmitter {
  constructor(options) {
    super()

    this[STORE] = null
    this._watcher = null
    this._options = options

    this[SERIALIZE] = JSON.stringify
    this[DESERIALIZE] = JSON.parse

    if(this._options.filename) {
      this._pesisted = true
      this._syncing = false
    }

    if(this._pesisted && this._options.sync) {
      this.load(this._options.filename).catch(err => _emitSafe.call(this, 'error', err))//.catch(err => console.error(err))
    }
  }

  set(path, value) {
    return this.patch([
      { op: 'add', path, value }
    ])
  }

  delete(path) {
    return this.patch([
      { op: 'remove', path }
    ])
  }

  get(path) {
    return jsonPointer.get(this[STORE], path)
  }

  load() {
    return _sync.call(this,
      read.call(this, this._options.filename)
        .then(data => this[STORE] = data)
    )
  }

  save() {
    return _sync.call(this,
      write.call(this, this._options.filename, this[STORE])
    )
  }

  patch(ops) {
    jsonPatch.apply(this[STORE], ops)

    if(this._options.sync) {
      this.save(this._options.filename).catch(err => _emitSafe.call(this, 'error', err))
    }

    return this
  }

  watch() {
    this._watcher = watch(this._options.filename, (event, filename) => {
      if(event == 'rename') {
        this._options.filename = filename

        this.unwatch()
        this.load().catch(err => _emitSafe.call(this, 'error', err)).then(() => this.watch())
      } else if(event == 'change') {
        this.unwatch()
        this.load().catch(err => _emitSafe.call(this, 'error', err)).then(() => this.watch())
      }
    })

    return this
  }

  unwatch() {
    this._watcher.close()
    return this
  }
}

module.exports = FileStore
