const assert = require('assert')
const Store = require('@alexeimyshkouski/store')
const JsonPlugin = require('../')

describe('Module', () => {
  it('should export [Function] as default', () => {
    assert.equal('function', typeof Store)
  })
})

describe('Static methods', () => {
  it('#create', () => {
    const store = Store.create()
    assert.equal('function', typeof Store)
  })
})

describe('Instance Methods', () => {
  let jsonStore

  beforeEach(() => {
    const JsonStore = Store
      .create()
      .use(JsonPlugin)

    jsonStore = new JsonStore()
  })

  describe('#get()', () => {
    it('should return appropriate value if path exists', () => {
      const path = '/random'
      const random = Math.random()

      jsonStore.set(path, random)

      assert.equal(random, jsonStore.get(path))
    })

    it(`should return 'undefined' if path does not exists`, () => {
      assert.equal(undefined, jsonStore.get('/nonExistentValue'))
    })
  })

  it('#set()', () => {
    const path = '/random'
    const random = Math.random()

    jsonStore.set(path, random)

    assert.equal(random, jsonStore[Store.symbols.STORE].random)
  })

  describe('#has()', () => {
    it(`should return 'true' if path exists`, () => {
      const path = '/random'
      const random = Math.random()

      jsonStore.set(path, random)

      assert.equal(true, jsonStore.has(path, random))
    })

    it(`should return 'false' if path does not exist`, () => {
      assert.equal(false, jsonStore.has('/nonExistentValue'))
    })
  })
})
