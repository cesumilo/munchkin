"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 12:14:51 pm
 * @copyright APPI SASU
 */
var Game =
/*#__PURE__*/
function () {
  function Game() {
    _classCallCheck(this, Game);
  }

  _createClass(Game, [{
    key: "constructure",
    value: function constructure() {
      this._isLaunched = false;
    }
  }, {
    key: "startGame",
    value: function startGame(players) {
      console.log("[GAME] Starting the game ! Enjoy");
      this._isLaunched = true; // TODO : Handle starting game !!!
    }
  }, {
    key: "isLaunched",
    value: function isLaunched() {
      return this._isLaunched;
    }
  }]);

  return Game;
}();

exports["default"] = Game;