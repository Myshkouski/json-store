import jsonPointer from 'json-pointer'

import { symbols, applyHooks } from '@alexeimyshkouski/store'

export default Store => {
  Object.assign(Store.prototype, {
    set(path, value) {
      return applyHooks.call(this, Store, ['set'], path, value)
    },

    remove(path) {
      return applyHooks.call(this, Store, ['remove'], path)
    },

    get(path) {
      if (this.has(path)) {
        return jsonPointer.get(this[symbols.STORE], path)
      }
    },

    has(path) {
      return jsonPointer.has(this[symbols.STORE], path)
    },

    clear(state) {
      if (!state instanceof Object) {
        throw TypeError('JsonStore must use Object as internal state, passed', typeof Object)
      }
      this[symbols.STORE] = state || {}

      applyHooks.call(this, Store, ['clear'])

      return this
    }
  })

  return {
    init() {
      this[symbols.STORE] = {}
    },

    set(path, value) {
      jsonPointer.set(this[symbols.STORE], path, value)

      applyHooks.call(this, Store, ['save'])

      return this
    },

    remove(path) {
      jsonPointer.remove(this[symbols.STORE], path)

      applyHooks.call(this, Store, ['save'])

      return this
    }
  }
}
