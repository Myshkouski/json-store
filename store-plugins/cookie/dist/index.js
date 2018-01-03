'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

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
    load: function load() {
      if (this[symbols.STATE].type == 'cookie') {
        this.clear(document.cookie.split(';').reduce(function (state, pair) {
          if (pair) {
            var split = pair.split('=');
            state[split[0]] = split[1];
          }
          return state;
        }, {}));
      }
    },
    save: function save() {
      if (this[symbols.STATE].type == 'cookie') {
        var cookie = [];
        for (var key in this[symbols.STORE]) {
          cookie.push(key + '=' + this[symbols.STORE][key]);
        }
        document.cookie = cookie.join(';');
      }
    }
  };
});

module.exports = index;
