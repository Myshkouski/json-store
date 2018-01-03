'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _defineProperty = _interopDefault(require('babel-runtime/helpers/defineProperty'));
var _Object$assign = _interopDefault(require('babel-runtime/core-js/object/assign'));
var symbols = require('./symbols');
var applyHooks = _interopDefault(require('./applyHooks'));

function use(applyPlugin) {
  if (!~this[symbols.PLUGINS].indexOf(applyPlugin)) {
    var hooks = applyPlugin(this);
    if (hooks) {
      this[symbols.HOOKS].push(hooks);
    }
    this[symbols.PLUGINS].push(applyPlugin);
  }

  return this;
}

function createStore() {
  function Store(options) {
    this[symbols.STATE] = {};

    applyHooks.call(this, Store, ['init'], options);
  }

  Store[symbols.PLUGINS] = [];
  Store[symbols.HOOKS] = [];

  Store.extend = function () {
    var Store = createStore();

    _Object$assign(Store, _defineProperty({}, symbols.PLUGINS, Store[symbols.PLUGINS]));

    Store[symbols.PLUGINS].forEach(Store.use);
  };

  Store.create = function () {
    return createStore();
  };

  Store.use = use.bind(Store);

  return Store;
}

var index = createStore();

module.exports = index;
