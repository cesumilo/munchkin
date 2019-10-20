"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRoom = void 0;

var _Room = _interopRequireDefault(require("../classes/Room"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var indexRoomToCreate = 0;

var createRoom = function createRoom() {
  return new _Room["default"](++indexRoomToCreate);
};

exports.createRoom = createRoom;