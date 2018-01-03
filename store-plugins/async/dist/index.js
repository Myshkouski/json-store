'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var symbols = require('@alexeimyshkouski/store/dist/symbols');
var Schedule = _interopDefault(require('./schedule'));

var index = (function () {
  return {
    init: function init() {
      if (!this[symbols.STATE].schedule) {
        this[symbols.STATE].schedule = new Schedule();
      }
    }
  };
});

module.exports = index;
