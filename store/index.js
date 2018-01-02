import * as symbols from './symbols'
import applyHooks from './applyHooks'

function use(applyPlugin) {
  if (!~this[symbols.PLUGINS].indexOf(applyPlugin)) {
    const hooks = applyPlugin(this)
    if (hooks) {
      this[symbols.HOOKS].push(hooks)
    }
    this[symbols.PLUGINS].push(applyPlugin)
  }

  return this
}

function createStore() {
  function Store(options) {
    this[symbols.STATE] = {}

    applyHooks.call(this, Store, ['init'], options)
  }

  Store[symbols.PLUGINS] = []
  Store[symbols.HOOKS] = []

  Store.extend = () => {
    const Store = createStore()

    Object.assign(Store, {
      [symbols.PLUGINS]: Store[symbols.PLUGINS]
    })

    Store[symbols.PLUGINS].forEach(Store.use)
  }

  Store.create = () => createStore()

  Store.use = use.bind(Store)

  return Store
}

export default createStore()
