module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SERIALIZE = exports.SERIALIZE = Symbol('serialize');
var DESERIALIZE = exports.DESERIALIZE = Symbol('deserialize');
var STORE = exports.STORE = Symbol('store');

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fileStore = __webpack_require__(2);

var _fileStore2 = _interopRequireDefault(_fileStore);

var _symbols = __webpack_require__(0);

var symbols = _interopRequireWildcard(_symbols);

var _jsonPatch = __webpack_require__(5);

var _jsonPatch2 = _interopRequireDefault(_jsonPatch);

var _jsonpointer = __webpack_require__(6);

var _jsonpointer2 = _interopRequireDefault(_jsonpointer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JsonStore = function (_FileStore) {
  _inherits(JsonStore, _FileStore);

  function JsonStore(options) {
    _classCallCheck(this, JsonStore);

    options.serialize = JSON.stringify;
    options.deserialize = JSON.parse;

    return _possibleConstructorReturn(this, (JsonStore.__proto__ || Object.getPrototypeOf(JsonStore)).call(this, options));
  }

  _createClass(JsonStore, [{
    key: 'set',
    value: function set(path, value) {
      return this.patch([{ op: 'add', path: path, value: value }]);
    }
  }, {
    key: 'delete',
    value: function _delete(path) {
      return this.patch([{ op: 'remove', path: path }]);
    }
  }, {
    key: 'get',
    value: function get(path) {
      return _jsonpointer2.default.get(this[symbols.STORE], path);
    }
  }, {
    key: 'patch',
    value: function patch(ops) {
      var _this2 = this;

      _jsonPatch2.default.apply({}, ops);

      if (this._options.sync) {
        this.save(this._options.filename).catch(function (err) {
          return _emitSafe.call(_this2, 'error', err);
        });
      }

      return this;
    }
  }]);

  return JsonStore;
}(_fileStore2.default);

exports.default = JsonStore;
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = __webpack_require__(3);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _symbols = __webpack_require__(0);

var symbols = _interopRequireWildcard(_symbols);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var F_OK = _fs.constants.F_OK,
    R_OK = _fs.constants.R_OK,
    W_OK = _fs.constants.W_OK;


function _emitSafe() {
  var _this = this;

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new Promise(function (done) {
    process.nextTick(function () {
      return _this.emit.apply(_this, args);
    });

    done();
  });
}

function checkAccess(filename, mode) {
  return new Promise(function (done, fail) {
    (0, _fs.access)(filename, mode, function (err) {
      return err ? fail(err) : done(filename);
    });
  });
}

function read(filename) {
  var _this2 = this;

  return new Promise(function (done, fail) {
    (0, _fs.readFile)(filename, function (err, data) {
      if (err) {
        fail(err);
      }

      try {
        done(_this2[symbols.DESERIALIZE](data));
      } catch (err) {
        fail(err);
      }
    });
  });
}

function write(filename, data) {
  var _this3 = this;

  return new Promise(function (done, fail) {
    (0, _fs.writeFile)(filename, _this3[symbols.SERIALIZE](data), function (err) {
      err ? fail(err) : done();
    });
  });
}

function _sync(deferred) {
  var _this4 = this;

  if (this._pesisted && !this._syncing) {
    this._syncing = false;

    return deferred.then(function (data) {
      return _this4[symbols.STORE] = data;
    }).then(function () {
      _this4._syncing = false;
      return _emitSafe.call(_this4, 'synced');
    }).catch(function (err) {
      _this4._syncing = false;
      throw err;
    });
  } else {
    return Promise.resolve();
  }
}

var FileStore = function (_EventEmitter) {
  _inherits(FileStore, _EventEmitter);

  function FileStore(options) {
    _classCallCheck(this, FileStore);

    var _this5 = _possibleConstructorReturn(this, (FileStore.__proto__ || Object.getPrototypeOf(FileStore)).call(this));

    _this5[symbols.STORE] = null;
    _this5._watcher = null;
    _this5._options = options;

    _this5[symbols.SERIALIZE] = options.serialize.bind(_this5);
    _this5[symbols.DESERIALIZE] = options.deserialize.bind(_this5);

    if (_this5._options.filename) {
      _this5._pesisted = true;
      _this5._syncing = false;
    }

    if (_this5._pesisted && _this5._options.sync) {
      _this5.load(_this5._options.filename).catch(function (err) {
        return _emitSafe.call(_this5, 'error', err);
      });
    }
    return _this5;
  }

  _createClass(FileStore, [{
    key: 'load',
    value: function load() {
      var _this6 = this;

      return _sync.call(this, read.call(this, this._options.filename).then(function (data) {
        return _this6[symbols.STORE] = data;
      }));
    }
  }, {
    key: 'save',
    value: function save() {
      return _sync.call(this, write.call(this, this._options.filename, this[symbols.STORE]));
    }
  }, {
    key: 'watch',
    value: function watch() {
      var _this7 = this;

      this._watcher = (0, _fs.watch)(this._options.filename, function (event, filename) {
        if (event == 'rename') {
          _this7._options.filename = filename;

          _this7.unwatch();
          _this7.load().catch(function (err) {
            return _emitSafe.call(_this7, 'error', err);
          }).then(function () {
            return _this7.watch();
          });
        } else if (event == 'change') {
          _this7.unwatch();
          _this7.load().catch(function (err) {
            return _emitSafe.call(_this7, 'error', err);
          }).then(function () {
            return _this7.watch();
          });
        }
      });

      return this;
    }
  }, {
    key: 'unwatch',
    value: function unwatch() {
      this._watcher.close();
      return this;
    }
  }]);

  return FileStore;
}(_events2.default);

exports.default = FileStore;
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Generated by CoffeeScript 1.12.7
(function () {
  var indexOf = [].indexOf || function (item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item) return i;
    }return -1;
  },
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  (function (factory) {
    var root;
    root = typeof window !== "undefined" && window !== null ? window : typeof global !== "undefined" && global !== null ? global : this;
    if (true) {
      return factory(exports);
    } else if (typeof define === 'function' && define.amd) {
      return define(['exports'], function (exports) {
        return root.jsonpatch = factory(exports);
      });
    } else {
      return root.jsonpatch = factory({});
    }
  })(function (exports) {
    var AddPatch, CopyPatch, InvalidPatchError, InvalidPointerError, JSONPatch, JSONPatchError, JSONPointer, MovePatch, PatchConflictError, PatchTestFailed, RemovePatch, ReplacePatch, TestPatch, _isEqual2, accessorMatch, apply, compile, escapedSlash, escapedTilde, hasOwnProperty, isArray, isEqual, isObject, isString, operationMap, toString;
    toString = Object.prototype.toString;
    hasOwnProperty = Object.prototype.hasOwnProperty;
    isArray = function isArray(obj) {
      return toString.call(obj) === '[object Array]';
    };
    isObject = function isObject(obj) {
      return toString.call(obj) === '[object Object]';
    };
    isString = function isString(obj) {
      return toString.call(obj) === '[object String]';
    };
    _isEqual2 = function _isEqual(a, b, stack) {
      var className, key, length, result, size;
      if (a === b) {
        return a !== 0 || 1 / a === 1 / b;
      }
      if (a === null || b === null) {
        return a === b;
      }
      className = toString.call(a);
      if (className !== toString.call(b)) {
        return false;
      }
      switch (className) {
        case '[object String]':
          String(a) === String(b);
          break;
        case '[object Number]':
          a = +a;
          b = +b;
          if (a !== a) {
            b !== b;
          } else {
            if (a === 0) {
              1 / a === 1 / b;
            } else {
              a === b;
            }
          }
          break;
        case '[object Boolean]':
          +a === +b;
      }
      if ((typeof a === "undefined" ? "undefined" : _typeof(a)) !== 'object' || (typeof b === "undefined" ? "undefined" : _typeof(b)) !== 'object') {
        return false;
      }
      length = stack.length;
      while (length--) {
        if (stack[length] === a) {
          return true;
        }
      }
      stack.push(a);
      size = 0;
      result = true;
      if (className === '[object Array]') {
        size = a.length;
        result = size === b.length;
        if (result) {
          while (size--) {
            if (!(result = indexOf.call(a, size) >= 0 === indexOf.call(b, size) >= 0 && _isEqual2(a[size], b[size], stack))) {
              break;
            }
          }
        }
      } else {
        if (indexOf.call(a, "constructor") >= 0 !== indexOf.call(b, "constructor") >= 0 || a.constructor !== b.constructor) {
          return false;
        }
        for (key in a) {
          if (hasOwnProperty.call(a, key)) {
            size++;
            if (!(result = hasOwnProperty.call(b, key) && _isEqual2(a[key], b[key], stack))) {
              break;
            }
          }
        }
        if (result) {
          for (key in b) {
            if (hasOwnProperty.call(b, key) && !size--) {
              break;
            }
          }
          result = !size;
        }
      }
      stack.pop();
      return result;
    };
    isEqual = function isEqual(a, b) {
      return _isEqual2(a, b, []);
    };
    JSONPatchError = function (superClass) {
      extend(JSONPatchError, superClass);

      function JSONPatchError(message) {
        this.message = message != null ? message : 'JSON patch error';
        this.name = 'JSONPatchError';
      }

      return JSONPatchError;
    }(Error);
    InvalidPointerError = function (superClass) {
      extend(InvalidPointerError, superClass);

      function InvalidPointerError(message) {
        this.message = message != null ? message : 'Invalid pointer';
        this.name = 'InvalidPointer';
      }

      return InvalidPointerError;
    }(Error);
    InvalidPatchError = function (superClass) {
      extend(InvalidPatchError, superClass);

      function InvalidPatchError(message) {
        this.message = message != null ? message : 'Invalid patch';
        this.name = 'InvalidPatch';
      }

      return InvalidPatchError;
    }(JSONPatchError);
    PatchConflictError = function (superClass) {
      extend(PatchConflictError, superClass);

      function PatchConflictError(message) {
        this.message = message != null ? message : 'Patch conflict';
        this.name = 'PatchConflictError';
      }

      return PatchConflictError;
    }(JSONPatchError);
    PatchTestFailed = function (superClass) {
      extend(PatchTestFailed, superClass);

      function PatchTestFailed(message) {
        this.message = message != null ? message : 'Patch test failed';
        this.name = 'PatchTestFailed';
      }

      return PatchTestFailed;
    }(Error);
    escapedSlash = /~1/g;
    escapedTilde = /~0/g;
    accessorMatch = /^[-+]?\d+$/;
    JSONPointer = function () {
      function JSONPointer(path) {
        var i, j, len1, step, steps;
        steps = [];
        if (path && (steps = path.split('/')).shift() !== '') {
          throw new InvalidPointerError();
        }
        for (i = j = 0, len1 = steps.length; j < len1; i = ++j) {
          step = steps[i];
          steps[i] = step.replace(escapedSlash, '/').replace(escapedTilde, '~');
        }
        this.accessor = steps.pop();
        this.steps = steps;
        this.path = path;
      }

      JSONPointer.prototype.getReference = function (parent) {
        var j, len1, ref, step;
        ref = this.steps;
        for (j = 0, len1 = ref.length; j < len1; j++) {
          step = ref[j];
          if (isArray(parent)) {
            step = parseInt(step, 10);
          }
          if (!(step in parent)) {
            throw new PatchConflictError('Array location out of bounds or not an instance property');
          }
          parent = parent[step];
        }
        return parent;
      };

      JSONPointer.prototype.coerce = function (reference, accessor) {
        if (isArray(reference)) {
          if (isString(accessor)) {
            if (accessor === '-') {
              accessor = reference.length;
            } else if (accessorMatch.test(accessor)) {
              accessor = parseInt(accessor, 10);
            } else {
              throw new InvalidPointerError('Invalid array index number');
            }
          }
        }
        return accessor;
      };

      return JSONPointer;
    }();
    JSONPatch = function () {
      function JSONPatch(patch) {
        if (!('path' in patch)) {
          throw new InvalidPatchError();
        }
        this.validate(patch);
        this.patch = patch;
        this.path = new JSONPointer(patch.path);
        this.initialize(patch);
      }

      JSONPatch.prototype.initialize = function () {};

      JSONPatch.prototype.validate = function (patch) {};

      JSONPatch.prototype.apply = function (document) {
        throw new Error('Method not implemented');
      };

      return JSONPatch;
    }();
    AddPatch = function (superClass) {
      extend(AddPatch, superClass);

      function AddPatch() {
        return AddPatch.__super__.constructor.apply(this, arguments);
      }

      AddPatch.prototype.validate = function (patch) {
        if (!('value' in patch)) {
          throw new InvalidPatchError();
        }
      };

      AddPatch.prototype.apply = function (document) {
        var accessor, reference, value;
        reference = this.path.getReference(document);
        accessor = this.path.accessor;
        value = this.patch.value;
        if (isArray(reference)) {
          accessor = this.path.coerce(reference, accessor);
          if (accessor < 0 || accessor > reference.length) {
            throw new PatchConflictError("Index " + accessor + " out of bounds");
          }
          reference.splice(accessor, 0, value);
        } else if (accessor == null) {
          document = value;
        } else {
          reference[accessor] = value;
        }
        return document;
      };

      return AddPatch;
    }(JSONPatch);
    RemovePatch = function (superClass) {
      extend(RemovePatch, superClass);

      function RemovePatch() {
        return RemovePatch.__super__.constructor.apply(this, arguments);
      }

      RemovePatch.prototype.apply = function (document) {
        var accessor, reference;
        reference = this.path.getReference(document);
        accessor = this.path.accessor;
        if (isArray(reference)) {
          accessor = this.path.coerce(reference, accessor);
          if (accessor >= reference.length) {
            throw new PatchConflictError("Value at " + accessor + " does not exist");
          }
          reference.splice(accessor, 1);
        } else {
          if (!(accessor in reference)) {
            throw new PatchConflictError("Value at " + accessor + " does not exist");
          }
          delete reference[accessor];
        }
        return document;
      };

      return RemovePatch;
    }(JSONPatch);
    ReplacePatch = function (superClass) {
      extend(ReplacePatch, superClass);

      function ReplacePatch() {
        return ReplacePatch.__super__.constructor.apply(this, arguments);
      }

      ReplacePatch.prototype.validate = function (patch) {
        if (!('value' in patch)) {
          throw new InvalidPatchError();
        }
      };

      ReplacePatch.prototype.apply = function (document) {
        var accessor, reference, value;
        reference = this.path.getReference(document);
        accessor = this.path.accessor;
        value = this.patch.value;
        if (accessor == null) {
          return value;
        }
        if (isArray(reference)) {
          accessor = this.path.coerce(reference, accessor);
          if (accessor >= reference.length) {
            throw new PatchConflictError("Value at " + accessor + " does not exist");
          }
          reference.splice(accessor, 1, value);
        } else {
          if (!(accessor in reference)) {
            throw new PatchConflictError("Value at " + accessor + " does not exist");
          }
          reference[accessor] = value;
        }
        return document;
      };

      return ReplacePatch;
    }(JSONPatch);
    TestPatch = function (superClass) {
      extend(TestPatch, superClass);

      function TestPatch() {
        return TestPatch.__super__.constructor.apply(this, arguments);
      }

      TestPatch.prototype.validate = function (patch) {
        if (!('value' in patch)) {
          throw new InvalidPatchError("'value' member is required");
        }
      };

      TestPatch.prototype.apply = function (document) {
        var accessor, reference, value;
        reference = this.path.getReference(document);
        accessor = this.path.accessor;
        value = this.patch.value;
        if (isArray(reference)) {
          accessor = this.path.coerce(reference, accessor);
        }
        if (!isEqual(reference[accessor], value)) {
          throw new PatchTestFailed();
        }
        return document;
      };

      return TestPatch;
    }(JSONPatch);
    MovePatch = function (superClass) {
      extend(MovePatch, superClass);

      function MovePatch() {
        return MovePatch.__super__.constructor.apply(this, arguments);
      }

      MovePatch.prototype.initialize = function (patch) {
        var i, j, len, ref, within;
        this.from = new JSONPointer(patch.from);
        len = this.from.steps.length;
        within = true;
        for (i = j = 0, ref = len; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
          if (this.from.steps[i] !== this.path.steps[i]) {
            within = false;
            break;
          }
        }
        if (within) {
          if (this.path.steps.length !== len) {
            throw new InvalidPatchError("'to' member cannot be a descendent of 'path'");
          }
          if (this.from.accessor === this.path.accessor) {
            return this.apply = function (document) {
              return document;
            };
          }
        }
      };

      MovePatch.prototype.validate = function (patch) {
        if (!('from' in patch)) {
          throw new InvalidPatchError("'from' member is required");
        }
      };

      MovePatch.prototype.apply = function (document) {
        var accessor, reference, value;
        reference = this.from.getReference(document);
        accessor = this.from.accessor;
        if (isArray(reference)) {
          accessor = this.from.coerce(reference, accessor);
          if (accessor >= reference.length) {
            throw new PatchConflictError("Value at " + accessor + " does not exist");
          }
          value = reference.splice(accessor, 1)[0];
        } else {
          if (!(accessor in reference)) {
            throw new PatchConflictError("Value at " + accessor + " does not exist");
          }
          value = reference[accessor];
          delete reference[accessor];
        }
        reference = this.path.getReference(document);
        accessor = this.path.accessor;
        if (isArray(reference)) {
          accessor = this.path.coerce(reference, accessor);
          if (accessor < 0 || accessor > reference.length) {
            throw new PatchConflictError("Index " + accessor + " out of bounds");
          }
          reference.splice(accessor, 0, value);
        } else {
          if (accessor in reference) {
            throw new PatchConflictError("Value at " + accessor + " exists");
          }
          reference[accessor] = value;
        }
        return document;
      };

      return MovePatch;
    }(JSONPatch);
    CopyPatch = function (superClass) {
      extend(CopyPatch, superClass);

      function CopyPatch() {
        return CopyPatch.__super__.constructor.apply(this, arguments);
      }

      CopyPatch.prototype.apply = function (document) {
        var accessor, reference, value;
        reference = this.from.getReference(document);
        accessor = this.from.accessor;
        if (isArray(reference)) {
          accessor = this.from.coerce(reference, accessor);
          if (accessor >= reference.length) {
            throw new PatchConflictError("Value at " + accessor + " does not exist");
          }
          value = reference.slice(accessor, accessor + 1)[0];
        } else {
          if (!(accessor in reference)) {
            throw new PatchConflictError("Value at " + accessor + " does not exist");
          }
          value = reference[accessor];
        }
        reference = this.path.getReference(document);
        accessor = this.path.accessor;
        if (isArray(reference)) {
          accessor = this.path.coerce(reference, accessor);
          if (accessor < 0 || accessor > reference.length) {
            throw new PatchConflictError("Index " + accessor + " out of bounds");
          }
          reference.splice(accessor, 0, value);
        } else {
          if (accessor in reference) {
            throw new PatchConflictError("Value at " + accessor + " exists");
          }
          reference[accessor] = value;
        }
        return document;
      };

      return CopyPatch;
    }(MovePatch);
    operationMap = {
      add: AddPatch,
      remove: RemovePatch,
      replace: ReplacePatch,
      move: MovePatch,
      copy: CopyPatch,
      test: TestPatch
    };
    compile = function compile(patch) {
      var j, klass, len1, ops, p;
      if (!isArray(patch)) {
        if (isObject(patch)) {
          patch = [patch];
        } else {
          throw new InvalidPatchError('patch must be an object or array');
        }
      }
      ops = [];
      for (j = 0, len1 = patch.length; j < len1; j++) {
        p = patch[j];
        if (!(klass = operationMap[p.op])) {
          throw new InvalidPatchError('invalid operation: ' + p.op);
        }
        ops.push(new klass(p));
      }
      return function (document) {
        var k, len2, op, result;
        result = document;
        for (k = 0, len2 = ops.length; k < len2; k++) {
          op = ops[k];
          result = op.apply(result);
        }
        return result;
      };
    };
    apply = function apply(document, patch) {
      return compile(patch)(document);
    };
    exports.version = '0.7.0';
    exports.apply = apply;
    exports.compile = compile;
    exports.JSONPointer = JSONPointer;
    exports.JSONPatch = JSONPatch;
    exports.JSONPatchError = JSONPatchError;
    exports.InvalidPointerError = InvalidPointerError;
    exports.InvalidPatchError = InvalidPatchError;
    exports.PatchConflictError = PatchConflictError;
    exports.PatchTestFailed = PatchTestFailed;
    return exports;
  });
}).call(undefined);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var hasExcape = /~/;
var escapeMatcher = /~[01]/g;
function escapeReplacer(m) {
  switch (m) {
    case '~1':
      return '/';
    case '~0':
      return '~';
  }
  throw new Error('Invalid tilde escape: ' + m);
}

function untilde(str) {
  if (!hasExcape.test(str)) return str;
  return str.replace(escapeMatcher, escapeReplacer);
}

function setter(obj, pointer, value) {
  var part;
  var hasNextPart;

  for (var p = 1, len = pointer.length; p < len;) {
    part = untilde(pointer[p++]);
    hasNextPart = len > p;

    if (typeof obj[part] === 'undefined') {
      // support setting of /-
      if (Array.isArray(obj) && part === '-') {
        part = obj.length;
      }

      // support nested objects/array when setting values
      if (hasNextPart) {
        if (pointer[p] !== '' && pointer[p] < Infinity || pointer[p] === '-') obj[part] = [];else obj[part] = {};
      }
    }

    if (!hasNextPart) break;
    obj = obj[part];
  }

  var oldValue = obj[part];
  if (value === undefined) delete obj[part];else obj[part] = value;
  return oldValue;
}

function compilePointer(pointer) {
  if (typeof pointer === 'string') {
    pointer = pointer.split('/');
    if (pointer[0] === '') return pointer;
    throw new Error('Invalid JSON pointer.');
  } else if (Array.isArray(pointer)) {
    return pointer;
  }

  throw new Error('Invalid JSON pointer.');
}

function _get(obj, pointer) {
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') throw new Error('Invalid input object.');
  pointer = compilePointer(pointer);
  var len = pointer.length;
  if (len === 1) return obj;

  for (var p = 1; p < len;) {
    obj = obj[untilde(pointer[p++])];
    if (len === p) return obj;
    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') return undefined;
  }
}

function _set(obj, pointer, value) {
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') throw new Error('Invalid input object.');
  pointer = compilePointer(pointer);
  if (pointer.length === 0) throw new Error('Invalid JSON pointer for set.');
  return setter(obj, pointer, value);
}

function compile(pointer) {
  var compiled = compilePointer(pointer);
  return {
    get: function get(object) {
      return _get(object, compiled);
    },
    set: function set(object, value) {
      return _set(object, compiled, value);
    }
  };
}

exports.get = _get;
exports.set = _set;
exports.compile = compile;

/***/ })
/******/ ]);
//# sourceMappingURL=index.webpack.js.map