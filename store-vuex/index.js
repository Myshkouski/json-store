/**
{
  "mutation/type": "/path/to/set"
}
*/

export default (storage, options) => {
  if(!options instanceof Object) {
    throw new TypeError('\'options\' must be object, passed', typeof options)
  }

  return store => {
    storage.load().then(() => {
      for(let type in options) {
        const path = options[type]
        if(storage.has(path)) {
          store.commit(type, storage.get([path]))
        }
      }

      store.subscribe(({ type, payload }) => {
        if(type in options) {
          storage.set(options[type], payload)
          storage.save()
        }
        return true
      })
    })
  }
}
