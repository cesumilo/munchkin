"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @author Alexandre SAISON <alexandre.saison.pro@gmail.com>
 * @file Card Model
 * @desc Created on 2019-10-20 11:22:15 am
 * @copyright APPI SASU
 */
var Card =
/*#__PURE__*/
function () {
  function Card(title) {
    _classCallCheck(this, Card);

    this._type = null;
    this._title = title;
  }

  _createClass(Card, [{
    key: "applyEffect",
    value: function applyEffect() {}
  }, {
    key: "play",
    value: function play(player) {}
  }, {
    key: "getID",
    value: function getID() {
      return "".concat(this._type, ":").concat(this._title);
    }
    /**
     *
     * @param {Array<Card>} hand
     * @param {string} cardID
     */

  }], [{
    key: "getCard",
    value: function getCard(hand, cardID) {
      var potentialCard = hand.find(function (c) {
        return c.getID() === cardID;
      });

      if (!potentialCard) {
        throw new Error("Card " + cardID + " hasn't been found");
      }

      return potentialCard;
    }
  }]);

  return Card;
}();

exports["default"] = Card;