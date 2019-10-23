"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Observable = _interopRequireDefault(require("./Observable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 5:51:26 pm
 * @copyright APPI SASU
 */
var Observer =
/*#__PURE__*/
function () {
  function Observer() {
    _classCallCheck(this, Observer);
  }

  _createClass(Observer, [{
    key: "subscribe",
    value: function subscribe(observable, evtName, callback) {
      if (observable instanceof _Observable["default"]) {
        if (!observable._observers[evtName]) {
          observable._observers[evtName] = [];
        }

        observable._observers[evtName].push(callback);
      } else throw new Error("You must only subscribe to an Observable instance type");
    }
  }]);

  return Observer;
}();

exports["default"] = Observer;