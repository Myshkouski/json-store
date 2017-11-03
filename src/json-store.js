import FileStore from './file-store'
import * as symbols from './symbols'
import parseJSON from 'parse-json'
import jsonPatch from 'json-patch'
import jsonPointer from 'json-pointer'
import emitSafe from './emitSafe'

class JSONStore extends FileStore {
  constructor(options) {
    super(Object.assign({}, options, {
      serialize: obj => JSON.stringify(obj),
      deserialize: string => parseJSON(string)
    }))

    this[symbols.STORE] = {}
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
      this.save().catch(err => emitSafe.call(this, 'error', err))
    }

    return this
  }
}

export default JSONStore
