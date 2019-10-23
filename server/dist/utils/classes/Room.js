"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Game = _interopRequireDefault(require("./Game"));

var _Observer2 = _interopRequireDefault(require("./others/Observer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 4:00:42 pm
 * @copyright APPI SASU
 */
var Room =
/*#__PURE__*/
function (_Observer) {
  _inherits(Room, _Observer);

  function Room(index) {
    var _this;

    _classCallCheck(this, Room);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Room).call(this));
    _this.timeouts = [];
    _this._game = new _Game["default"]();
    _this._name = "Room".concat(index);
    _this._players = [];
    _this._master = null;
    return _this;
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
      this._game.startGame(this._players);
    }
  }, {
    key: "endGame",
    value: function endGame() {
      // TODO : Must be called before removing the Room
      this.destroy();
    }
  }, {
    key: "removePlayer",
    value: function removePlayer(playerID) {
      var playerToRemove = this.findPlayer(playerID);

      if (!!playerToRemove) {
        console.log("[ROOM] BEFORE #playerRemove::players_length =>  ".concat(this._players.length));
        this._players = this._players.filter(function (p) {
          return p.getID() !== playerToRemove.getID();
        });
        console.log("[ROOM] AFTER #playerRemove::players_length =>  ".concat(this._players.length));
      }

      console.log('[ROOM] getEvent !!! ', this._players.map(function (p) {
        return {
          name: p.getName(),
          isReady: p.isReady()
        };
      }));
    }
  }, {
    key: "findPlayer",
    value: function findPlayer(player) {
      console.log('[ROOM] #findPlayer::player =>  ', player);
      return this._players.find(function (p) {
        return p.getID() === player;
      });
    }
  }, {
    key: "addPlayer",
    value: function addPlayer(player) {
      var _this2 = this;

      console.log('[ROOM] getEvent !!! ', this._players.map(function (p) {
        return p.isReady();
      }));
      if (this._players.some(function (p) {
        return p.getID() === player.getID();
      })) throw new Error("You can't join twice to the room");

      this._players.push(player);

      this.subscribe(player, "player:ready", function () {
        if (_this2._players.length >= 3 && _this2._players.every(function (p) {
          return p.isReady();
        })) {
          _this2.timeouts.push(setTimeout(function () {
            _this2.startGame();
          }, 3000));
        }
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.timeouts.forEach(function (timeout) {
        return clearTimeout(timeout);
      });
    }
  }, {
    key: "getPlayers",
    value: function getPlayers() {
      return this._players;
    }
  }]);

  return Room;
}(_Observer2["default"]);

exports["default"] = Room;