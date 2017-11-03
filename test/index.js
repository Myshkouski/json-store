const assert = require('assert')
const JsonStore = require('../')

describe('Store', () => {
  describe('#get()', () => {
    const store = new JsonStore()
    store.set('/foo', 'bar')

    it('should return \'bar\'', () => {
      assert.equal('bar', store.get('/foo'))
    })
  })
})
