'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _Object$assign = _interopDefault(require('babel-runtime/core-js/object/assign'));
var defaults = _interopDefault(require('lodash.defaultsdeep'));
var symbols = require('@alexeimyshkouski/store/dist/symbols');
var applyHooks = _interopDefault(require('@alexeimyshkouski/store/dist/applyHooks'));
var AsyncStore = _interopDefault(require('@alexeimyshkouski/store-async-plugin'));

function _sync(Store, hook) {
  var _this = this;

  this[symbols.STATE].schedule.deferred(function () {
    _this[symbols.STATE].syncing = true;
    applyHooks.call(_this, Store, [hook]);
  });

  this[symbols.STATE].schedule.deferred(function () {
    _this[symbols.STATE].syncing = false;
  });

  return this[symbols.STATE].schedule.deferred(function () {});
}

var index = (function (Store) {
  Store.use(AsyncStore);

  _Object$assign(Store.prototype, {
    load: function load() {
      return _sync.call(this, Store, 'load');
    },
    save: function save() {
      return _sync.call(this, Store, 'save');
    },
    sync: function sync(task) {
      return this[symbols.STATE].schedule.deferred(function () {});
    }
  });

  return {
    init: function init(options) {
      defaults(this[symbols.STATE], options, {
        sync: false,
        syncing: false,
        watcher: null
      });

      if (this[symbols.STATE].sync) {
        this.load().catch(function (err) {
          return console.error(err);
        });
      }
    }
  };
});

module.exports = index;
