import * as symbols from './symbols'

const maybeAsyncReduce = f => (promiseOrState, value, index, array) => {
  if (promiseOrState instanceof Promise) {
    return promiseOrState.then(state => f(state, value, index, array))
  } else {
    return f(promiseOrState, value, index, array)
  }
}

export default function (Store, keys, ...args) {
  return Store[symbols.HOOKS].reduce(
    maybeAsyncReduce((value, hooks) => keys.reduce(
      maybeAsyncReduce((value, key) => {
        if (typeof hooks[key] == 'function') {
          return hooks[key].apply(this, args)
        } else {
          return value
        }
      }), undefined
    )), undefined
  )
}
