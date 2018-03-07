const assert = require('assert')
const Store = require('@alexeimyshkouski/store')
const AsyncPlugin = require('../')

describe('Module', () => {
  it('should export [Function] as default', () => {
    assert.equal('function', typeof Store)
  })
})
