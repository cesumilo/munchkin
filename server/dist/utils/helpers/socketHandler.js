"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Player = _interopRequireDefault(require("../classes/Player"));

var _Room = _interopRequireDefault(require("../classes/Room"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 6:24:16 pm
 * @copyright APPI SASU
 */
function ROOM_MANAGEMENT(availableRooms, socket, socketServer) {
  // Finding the first room which is available
  var roomToJoin = availableRooms.find(function (room) {
    return room.canBeJoined();
  });

  if (!roomToJoin) {
    socket.emit("socket:error", "No room available ! Please try on another day !");
  } // Handle master of the room creation


  if (!roomToJoin.getMaster()) {
    roomToJoin.setMaster(new _Player["default"](socket.id, socket, roomToJoin));
  } else {
    roomToJoin.addPlayer(new _Player["default"](socket.id, socket, roomToJoin));
  }

  socket.join(roomToJoin.getName(), function (err) {
    if (err) socket.emit("socket:error", "Unabled to join room ! Please contact the Administrator");
    socket.emit("player:creation", roomToJoin.getName());
    socketServer.to(roomToJoin.getName()).emit("room:message", "Someone joined the ROOM !");
  });
  socket.on("disconnect", function () {
    socketServer.to(roomToJoin.getName()).emit('room:message', "Someone has left the ROOM !");
    roomToJoin.removePlayer(socket.id); // TODO : Handle GAME Event (Charity PLEEEAAASSSEE !)
  });
  return roomToJoin;
}
/**
 * 
 * @param {Room} room 
 * @param {SocketIO.EngineSocket} socket 
 * @param {*} socketServer 
 */


function PLAYER_MANAGEMENT(room, socket, socketServer) {
  console.log('[SERVER][PLAYER_MANAGEMENT] room => ', room);
  socket.on("stage:update", function (payload) {});
  socket.on("player:card:use", function (cardID) {
    var currentPlayer = room.findPlayer(cardID);

    if (!currentPlayer) {
      throw new Error("Cannot find current player");
    }
  });
}

var _default = function _default(socketServer, socket, availableRooms) {
  var room = ROOM_MANAGEMENT(availableRooms, socket, socketServer);
  PLAYER_MANAGEMENT(room, socket, socketServer);
};

exports["default"] = _default;