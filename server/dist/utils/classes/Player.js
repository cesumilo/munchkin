"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Card = _interopRequireDefault(require("./Card"));

var _Player = require("../actions/Player");

var _Observable2 = _interopRequireDefault(require("./others/Observable"));

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

var Player =
/*#__PURE__*/
function (_Observable) {
  _inherits(Player, _Observable);

  function Player(name, socket, room) {
    var _this;

    _classCallCheck(this, Player);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Player).call(this));
    _this._room = room;
    _this._socket = socket;
    _this._name = name;
    _this._lvl = 1;
    _this._strength = 0;
    _this._equipments = [];
    _this._cards = [];
    _this._race = "Humain";
    _this._class = "None";
    _this._ready = false;

    _this.waitForEvents();

    return _this;
  }

  _createClass(Player, [{
    key: "waitForEvents",
    value: function waitForEvents() {
      this._socket.on("player:action", this.handleEvent.bind(this));
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(event) {
      console.log("Received action => ", event);

      switch (event.action) {
        case _Player.READY:
          this.updateReadiness(true);
          this.publish("player:ready", null);
          break;

        case _Player.UNREADY:
          this.updateReadiness(false);
          this.publish("player:unready", null);
          break;

        case _Player.PLAY_CARD:
          this["break"];

        case FINISH_TURN:
          if (this.canFinishLap()) {// TODO : Handle update Stage
          }

          break;

        default:
      }
    }
  }, {
    key: "isReady",
    value: function isReady() {
      return this._ready;
    }
  }, {
    key: "updateReadiness",
    value: function updateReadiness(ready) {
      this._ready = ready;

      this._socket.emit("room:message", "You are ".concat(this._ready ? "" : "not", " ready"));
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
      if (!(card instanceof _Card["default"])) throw new Error("card parameter must be a Card object");
      if (card.hasEffect()) card.applyEffect(this);

      this._cards.push(card);
    }
  }, {
    key: "useCard",
    value: function useCard(card) {
      var player = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      card.use(player);

      this._socket.emit("player:useCard", {
        level: this._lvl,
        equipments: this._equipments,
        strength: this.getStrength(),
        race: this._race,
        className: this._class,
        cards: this._cards.map(function (c) {
          return c.constructor.name();
        })
      });
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
    key: "getName",
    value: function getName() {
      return this._name;
    }
  }, {
    key: "giveCard",
    value: function giveCard(card) {// TODO : Handle this when socket.io
    }
  }]);

  return Player;
}(_Observable2["default"]);

exports["default"] = Player;