"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Game = _interopRequireDefault(require("./Game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 4:00:42 pm
 * @copyright APPI SASU
 */
var Room =
/*#__PURE__*/
function () {
  function Room(index) {
    _classCallCheck(this, Room);

    this._game = new _Game["default"]();
    this._name = "Room".concat(index);
    this._players = [];
    this._master = null;
  }

  _createClass(Room, [{
    key: "getName",
    value: function getName() {
      return this._name;
    }
  }, {
    key: "setMaster",
    value: function setMaster(master) {
      this._master = master;

      this._players.push(master);
    }
  }, {
    key: "canBeJoined",
    value: function canBeJoined() {
      return (!this._master || this._players.length <= 6) && !this._game.isLaunched();
    }
    /**
     * @returns {string} return the SocketID of the Master
     */

  }, {
    key: "getMaster",
    value: function getMaster() {
      return this._master && this._master.getID();
    }
  }, {
    key: "startGame",
    value: function startGame() {
      // TODO : has to be called when everyone in the room is READY
      if (this._players.some(function (p) {
        return !p.isReady();
      })) {
        throw new Error("Game can only start when everyone is ready");
      }

      this._game = new _Game["default"]();
    }
  }, {
    key: "addPlayer",
    value: function addPlayer(player) {
      if (this._players.some(function (p) {
        return p.getID() === player.getID();
      })) throw new Error("You can't join twice to the room");

      this._players.push(player);
    }
  }, {
    key: "getPlayers",
    value: function getPlayers() {
      return this._players;
    }
  }]);

  return Room;
}();

exports["default"] = Room;