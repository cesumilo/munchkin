"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Player = _interopRequireDefault(require("./Player"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game =
/*#__PURE__*/
function () {
  function Game() {
    _classCallCheck(this, Game);
  }

  _createClass(Game, [{
    key: "constructure",
    value: function constructure(room) {
      this._room = room;
      this._isLaunched = false;
    }
  }, {
    key: "startGame",
    value: function startGame() {
      this._isLaunched = true; // TODO : Handle starting game !!!
    }
  }, {
    key: "isLaunched",
    value: function isLaunched() {
      return this._isLaunched;
    }
  }, {
    key: "appendPlayer",
    value: function appendPlayer(name, socket) {
      this._room.getPlayers().push(new _Player["default"](name, socket));
    }
  }, {
    key: "findPlayer",
    value: function findPlayer(player) {
      return this._room.getPlayers().find(function (p) {
        return p.getID() === player.getID();
      });
    }
  }]);

  return Game;
}();

exports["default"] = Game;