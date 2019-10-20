"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Card = _interopRequireDefault(require("./Card"));

var _Player = require("../actions/Player");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Player =
/*#__PURE__*/
function () {
  function Player(name, socket) {
    _classCallCheck(this, Player);

    this._socket = socket;
    this._name = name;
    this._lvl = 1;
    this._strength = 0;
    this._equipments = [];
    this._cards = [];
    this._race = "Humain";
    this._class = "None";
    this._ready = false;
    this.waitForEvents();
  }

  _createClass(Player, [{
    key: "waitForEvents",
    value: function waitForEvents() {
      this._socket.on("player:action", this.handleEvent.bind(this));
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(event) {
      console.log('Received action => ', event);

      switch (event.action) {
        case _Player.READY:
          this.updateReadiness();

        default:
      }
    }
  }, {
    key: "updateReadiness",
    value: function updateReadiness() {
      this._ready = !this._ready;

      this._socket.emit("room:message", "You are ".concat(this._ready ? '' : 'not', " ready"));
    }
  }, {
    key: "getStrength",
    value: function getStrength() {
      return this._lvl + this._equipments.reduce(function (a, c) {
        return a + c.getValue();
      }, 0);
    }
  }, {
    key: "getCard",
    value: function getCard(card) {
      if (!(card instanceof _Card["default"])) throw new Error('card parameter must be a Card object');
      if (card.hasEffect()) card.applyEffect(this);

      this._cards.push(card);
    }
  }, {
    key: "canFinishLap",
    value: function canFinishLap() {
      var cardsLength = this._cards.length;
      return this._race === "Nain" ? cardsLength <= 6 : cardsLength <= 5;
    }
  }, {
    key: "updateLevel",
    value: function updateLevel(amount) {
      if (this._lvl + amount < 1) {
        this._lvl = 1;
        throw new Error("Level of ".concat(this._name, " can't be under 1"));
      } else if (this._lvl + amount >= 10) {
        throw "".concat(this._name, " has won the Game");
      } else {
        this._lvl += amount;
      }
    }
  }, {
    key: "getID",
    value: function getID() {
      return this._socket.id;
    }
  }, {
    key: "giveCard",
    value: function giveCard(card) {// TODO : Handle this when socket.io
    }
  }]);

  return Player;
}();

exports["default"] = Player;