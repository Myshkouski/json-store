'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _typeof = _interopDefault(require('babel-runtime/helpers/typeof'));
var _Object$assign = _interopDefault(require('babel-runtime/core-js/object/assign'));
var jsonPointer = _interopDefault(require('json-pointer'));
var symbols = require('@alexeimyshkouski/store/dist/symbols');
var applyHooks = _interopDefault(require('@alexeimyshkouski/store/dist/applyHooks'));

var index = (function (Store) {
  _Object$assign(Store.prototype, {
    set: function set(path, value) {
      jsonPointer.set(this[symbols.STORE], path, value);

      applyHooks.call(this, Store, ['save']);

      return this;
    },
    remove: function remove(path) {
      jsonPointer.remove(this[symbols.STORE], path);

      applyHooks.call(this, Store, ['save']);

      return this;
    },
    get: function get(path) {
      if (this.has(path)) {
        return jsonPointer.get(this[symbols.STORE], path);
      }
    },
    has: function has(path) {
      return jsonPointer.has(this[symbols.STORE], path);
    },
    clear: function clear(state) {
      if (!state instanceof Object) {
        throw TypeError('JsonStore must use Object as internal state, passed', typeof Object === 'undefined' ? 'undefined' : _typeof(Object));
      }
      this[symbols.STORE] = state || {};
      applyHooks.call(this, Store, ['clear']);
      return this;
    }
  });

  return {
    init: function init() {
      this[symbols.STORE] = {};
    }
  };
});

module.exports = index;
