"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.IEffect = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @author Alexandre SAISON <alexandre.saison.pro@gmail.com>
 * @file Card Model
 * @desc Created on 2019-10-20 11:22:15 am
 * @copyright APPI SASU
 */
var IEffect =
/*#__PURE__*/
function () {
  function IEffect() {
    _classCallCheck(this, IEffect);
  }

  _createClass(IEffect, null, [{
    key: "apply",
    value: function apply(parentClassInstance) {
      if (typeof parentClassInstance !== "function") throw new Error("classInstance must be a Class");

      var tmpClass =
      /*#__PURE__*/
      function (_parentClassInstance) {
        _inherits(TmpClass, _parentClassInstance);

        function TmpClass() {
          _classCallCheck(this, TmpClass);

          return _possibleConstructorReturn(this, _getPrototypeOf(TmpClass).apply(this, arguments));
        }

        return TmpClass;
      }(parentClassInstance);

      for (var _len = arguments.length, otherClasses = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        otherClasses[_key - 1] = arguments[_key];
      }

      for (classInstance in otherClasses) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = classInstance.prototype[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            method = _step.value;

            if (!!tmpClass.prototype.method) {
              console.warn("Warning : ".concat(method, " already exists !"));
            }

            tmpClass.prototype.method = method;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  }]);

  return IEffect;
}();

exports.IEffect = IEffect;

var Card = function Card(title) {
  _classCallCheck(this, Card);

  this._title = title;
};

exports["default"] = Card;