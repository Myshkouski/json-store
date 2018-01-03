'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _Promise = _interopDefault(require('babel-runtime/core-js/promise'));
var _classCallCheck = _interopDefault(require('babel-runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('babel-runtime/helpers/createClass'));
var _Symbol = _interopDefault(require('babel-runtime/core-js/symbol'));

var PENDING = _Symbol('PENDING');

var Schedule = function () {
  function Schedule() {
    _classCallCheck(this, Schedule);

    this[PENDING] = _Promise.resolve();
  }

  _createClass(Schedule, [{
    key: 'immediate',
    value: function immediate(task) {
      var p = _Promise.all([this[PENDING], _Promise.resolve(task())]);

      // this[PENDING] = p.catch(err => {})

      return p;
    }
  }, {
    key: 'deferred',
    value: function deferred(task) {
      var p = this[PENDING].then(function (r) {
        return task();
      });
      // this[PENDING] = p.catch(err => {})

      return p;
    }
  }]);

  return Schedule;
}();

module.exports = Schedule;
