import * as symbols from '../symbols'

export default function applyHooks(Store, keys, ...args) {
  Store[symbols.HOOKS].forEach(hooks => {
    keys.forEach(key => {
      if(hooks[key]) {
        hooks[key].apply(this, args)
      }
    })
  })
}
