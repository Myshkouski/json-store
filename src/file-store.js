import { readFile, writeFile, watch } from 'fs'
import { resolve } from 'path'
import EventEmitter from 'events'
import Schedule from './schedule'
import * as symbols from './symbols'
import emitSafe from './emitSafe'
import defaults from 'lodash.defaultsdeep'

function _sync(task) {
  this._syncing = true
  const p = this[symbols.SCHEDULE].deferred(() =>
    new Promise(task)
      .then(() => {
        this._syncing = false
        return emitSafe.call(this, 'synced')
      })
      .catch(err => {
        this._syncing = false
        throw err
      })
  )

  return p//.catch(err => console.error('!'))
}

class FileStore extends EventEmitter {
  constructor(options) {
    super()

    this[symbols.STORE] = null
    this._watcher = null

    this[symbols.SCHEDULE] = new Schedule()
    //this[symbols.SCHEDULE].on('error', err => this.emit('error', err))

    this[symbols.SERIALIZE] = options.serialize//.bind(this)
    this[symbols.DESERIALIZE] = options.deserialize//.bind(this)

    this._options = {
      sync: options.sync
    }

    if(options.filename) {
      this._options.filename = resolve(process.cwd(), options.filename)
      this._pesisted = true
      this._syncing = false
    }

    if(this._pesisted && options.sync) {
      this.load().catch(err => emitSafe.call(this, 'error', err))
    }
  }

  load(filename = this._options.filename) {
    return _sync.call(this, (done, fail) => {
      readFile(filename, (err, buffer) => {
        if(err) {
          fail(err)
        }

        try {
          done(defaults(this[symbols.STORE], this[symbols.DESERIALIZE](buffer.toString())))
        } catch(err) {
          fail(err)
        }
      })
    })
  }

  save(filename = this._options.filename) {
    return _sync.call(this, (done, fail) => {
      writeFile(filename, this[symbols.SERIALIZE](this[symbols.STORE]), err => {
        err ? fail(err) : done()
      })
    })
  }

  watch() {
    this._watcher = watch(this._options.filename, (event, filename) => {
      if(event == 'rename') {
        this._options.filename = filename

        this.unwatch()
        this.load().catch(err => emitSafe.call(this, 'error', err)).then(() => this.watch())
      } else if(event == 'change') {
        this.unwatch()
        this.load().catch(err => emitSafe.call(this, 'error', err)).then(() => this.watch())
      }
    })

    return this
  }

  unwatch() {
    this._watcher.close()
    this._watcher = null
    return this
  }
}

export default FileStore
