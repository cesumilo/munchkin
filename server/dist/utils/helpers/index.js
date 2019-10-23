"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRoom = void 0;

var _Room = _interopRequireDefault(require("../classes/Room"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 5:35:03 pm
 * @copyright APPI SASU
 */
"";
var indexRoomToCreate = 0;

var createRoom = function createRoom() {
  return new _Room["default"](++indexRoomToCreate);
};

exports.createRoom = createRoom;