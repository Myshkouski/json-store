import { readFile, writeFile, access, watch, constants } from 'fs'
import EventEmitter from 'events'
import * as symbols from './symbols'

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
        done(this[symbols.DESERIALIZE](data))
      } catch(err) {
        fail(err)
      }
    })
  })
}

function write(filename, data) {
  return new Promise((done, fail) => {
    writeFile(filename, this[symbols.SERIALIZE](data), err => {
      err ? fail(err) : done()
    })
  })
}

function _sync(deferred) {
  if(this._pesisted && !this._syncing) {
    this._syncing = false

    return deferred
      .then(data => this[symbols.STORE] = data)
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

    this[symbols.STORE] = null
    this._watcher = null
    this._options = options

    this[symbols.SERIALIZE] = options.serialize.bind(this)
    this[symbols.DESERIALIZE] = options.deserialize.bind(this)

    if(this._options.filename) {
      this._pesisted = true
      this._syncing = false
    }

    if(this._pesisted && this._options.sync) {
      this.load(this._options.filename).catch(err => _emitSafe.call(this, 'error', err))
    }
  }

  load() {
    return _sync.call(this,
      read.call(this, this._options.filename)
        .then(data => this[symbols.STORE] = data)
    )
  }

  save() {
    return _sync.call(this,
      write.call(this, this._options.filename, this[symbols.STORE])
    )
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

export default FileStore
