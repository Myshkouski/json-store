'use strict';

var symbols = require('./symbols');

function applyHooks(Store, keys) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var _this = this;

  Store[symbols.HOOKS].forEach(function (hooks) {
    keys.forEach(function (key) {
      if (hooks[key]) {
        hooks[key].apply(_this, args);
      }
    });
  });
}

module.exports = applyHooks;
