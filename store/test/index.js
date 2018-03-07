const assert = require('assert')
const Store = require('../')

describe('Module', () => {
  it('should export [Function] as default', () => {
    assert.equal('function', typeof Store)
  })
})

describe('Static methods', () => {
  it('constructor', () => {
    const TestStore = Store.create()
    const testStore = new TestStore()
    assert.ok(testStore instanceof TestStore)
  })

  it('#create', () => {
    const TestStore = Store.create()
    assert.equal('function', typeof TestStore)
  })
})

describe('Plugins', () => {
  let pluginResults, TestStore, testStore

  const testPlugins = hooks => Store.applyHooks.call(testStore, TestStore, hooks)

  beforeEach(() => {
    pluginResults = {}
    TestStore = Store
      .create()
      .use(Store => {
        return {
          init() {
            pluginResults.init = true
          }
        }
      })
      .use(Store => {
        return {
          sync() {
            pluginResults.sync1 = true
            return 'sync1'
          },

          async () {
            pluginResults.async1 = true
            return Promise.resolve('async1')
          }
        }
      })
      .use(Store => {
        return {
          sync() {
            pluginResults.sync2 = true
            return 'sync2'
          },

          async () {
            pluginResults.async2 = true
            return Promise.resolve('async2')
          }
        }
      })
    testStore = new TestStore()
  })

  describe('Sync Plugins', () => {
    it('all plugin should be applied', () => {
      Store.applyHooks.call(testStore, TestStore, ['sync'])

      assert.equal(pluginResults.sync1, true)
      assert.equal(pluginResults.sync2, true)
    })

    it('should return appropriate value', () => {
      const res = Store.applyHooks.call(testStore, TestStore, ['sync'])

      assert.equal(res, 'sync2')
    })
  })

  describe('Async Plugins', () => {
    it('all plugin should be applied', async () => {
      await Store.applyHooks.call(testStore, TestStore, ['async'])
      assert.equal(pluginResults.async1, true)
      assert.equal(pluginResults.async2, true)
    })

    it('should return Promise', () => {
      const res = Store.applyHooks.call(testStore, TestStore, ['async'])
      assert.ok(res instanceof Promise)
    })

    it('should be resolved with appropriate value', async () => {
      const res = await Store.applyHooks.call(testStore, TestStore, ['async'])
      assert.equal(res, 'async2')
    })
  })
})
