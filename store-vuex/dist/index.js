'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _typeof = _interopDefault(require('babel-runtime/helpers/typeof'));

/**
{
  "mutation/type": "/path/to/set"
}
*/

var index = (function (storage, options) {
  if (!options instanceof Object) {
    throw new TypeError('\'options\' must be object, passed', typeof options === 'undefined' ? 'undefined' : _typeof(options));
  }

  return function (store) {
    storage.load().then(function () {
      for (var type in options) {
        var path = options[type];
        if (storage.has(path)) {
          store.commit(type, storage.get([path]));
        }
      }

      store.subscribe(function (_ref) {
        var type = _ref.type,
            payload = _ref.payload;

        if (type in options) {
          storage.set(options[type], payload);
          storage.save();
        }
        return true;
      });
    });
  };
});

module.exports = index;
