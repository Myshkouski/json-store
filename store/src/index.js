import * as symbols from './symbols'
import applyHooks from './applyHooks'

function use(applyPlugin) {
  // if plugin has not been used yet
  if (!~this[symbols.PLUGINS].indexOf(applyPlugin)) {
    // apply plugin extends prototype and returns hooks
    const hooks = applyPlugin(this)
    if (hooks) {
      const pre = {},
        post = {}
      for (let key in hooks) {
        const hook = hooks[key]
        if (typeof hook == 'function') {
          post[key] = hook
        } else if (hook.pre) {
          pre[key] = hook.apply
        } else {
          post[key] = hook.apply
        }
      }

      if(Object.keys(pre).length) {
        this[symbols.HOOKS].unshift(pre)
      }

      if(Object.keys(post).length) {
        this[symbols.HOOKS].push(post)
      }
    }

    this[symbols.PLUGINS].push(applyPlugin)
  }

  return this
}

function createStore() {
  function Store(options) {
    this[symbols.STATE] = {}

    StoreFactory.applyHooks.call(this, Store, ['init'], options)
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

  Store.use = use.bind(Store)

  return Store
}

function StoreFactory() {}

StoreFactory.create = () => createStore()
StoreFactory.applyHooks = applyHooks
StoreFactory.symbols = symbols

export default StoreFactory
