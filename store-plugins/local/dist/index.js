'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _JSON$stringify = _interopDefault(require('babel-runtime/core-js/json/stringify'));
var symbols = require('@alexeimyshkouski/store/dist/symbols');
var PersistedStore = _interopDefault(require('@alexeimyshkouski/store-persist-plugin'));
var JsonStore = _interopDefault(require('@alexeimyshkouski/store-json-plugin'));

var index = (function (Store) {
  Store.use(PersistedStore);
  Store.use(JsonStore);

  if (typeof process !== 'undefined' && (process.SERVER_BUILD || process.env && process.env.VUE_ENV == 'server')) {
    return;
  }

  return {
    init: function init(options) {
      var type = this[symbols.STATE].type;

      if (type == 'local') {
        this[symbols.STATE].storage = window.localStorage;
      } else if (type == 'session') {
        this[symbols.STATE].storage = window.sessionStorage;
      } else {
        throw new Error('Unknown storage type:', type);
      }
    },
    load: function load() {
      if (this[symbols.STATE].type == 'local') {
        this.clear();

        for (var i = 0; i < window.localStorage.length; i++) {
          var key = window.localStorage.key(i);
          var value = window.localStorage.getItem(key);
          this[symbols.STORE][key] = JSON.parse(value);
        }
      }
    },
    save: function save() {
      if (this[symbols.STATE].type == 'local') {
        for (var key in this[symbols.STORE]) {
          window.localStorage.setItem(key, _JSON$stringify(this[symbols.STORE][key]));
        }
      }
    }
  };
});

module.exports = index;
