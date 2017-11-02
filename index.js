const Store = require('./dist/index.webpack')

const store = new Store({
  filename: 'store.json',
  sync: true
})

store.on('synced', () => {
  store.set('/value', 1)
  console.log(store.get(''))
}).on('error', console.error)

store.watch()//.unwatch()
