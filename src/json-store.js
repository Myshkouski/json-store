import FileStore from './file-store'
import * as symbols from './symbols'
import jsonPatch from 'json-patch'
import jsonPointer from 'jsonpointer'

class JsonStore extends FileStore {
  constructor(options) {
    options.serialize = JSON.stringify
    options.deserialize = JSON.parse

    super(options)
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
    return jsonPointer.get(this[symbols.STORE], path)
  }

  patch(ops) {
    jsonPatch.apply(this[symbols.STORE], ops)

    if(this._options.sync) {
      this.save(this._options.filename).catch(err => _emitSafe.call(this, 'error', err))
    }

    return this
  }
}

export default JsonStore
