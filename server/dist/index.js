"use strict";

var _express = _interopRequireDefault(require("express"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cors = _interopRequireDefault(require("cors"));

var _socket = _interopRequireDefault(require("socket.io"));

var _http = _interopRequireDefault(require("http"));

var _helpers = require("./utils/helpers");

var _default = _interopRequireDefault(require("./routes/default"));

var _Player = _interopRequireDefault(require("./utils/classes/Player"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @author Alexandre SAISON <alexandre.saison.pro@gmail.com>
 * @file server main file
 * @desc Created on 2019-10-20 1:07:51 pm
 * @copyright APPI SASU
 */
// Helpers
// Application
var expressServer = (0, _express["default"])();

var httpServer = _http["default"].createServer(expressServer);

var socketServer = (0, _socket["default"])(httpServer);
expressServer.use((0, _helmet["default"])());
expressServer.use((0, _cors["default"])()); // Routes

expressServer.use('/', (0, _default["default"])(expressServer)); // TODO : Has to be moved to initiator of the GameServer

var availableRooms = [];

for (var i = 0; i < 10; i++) {
  availableRooms.push((0, _helpers.createRoom)());
}

httpServer.listen(process.env.NODE_ENV === "production" ? process.env.PORT : 3000, function () {
  socketServer.on("connection", function (socket) {
    // Finding the first room which is available
    var roomToJoin = availableRooms.find(function (room) {
      return room.canBeJoined();
    }); // Handle master of the room creation

    if (!roomToJoin.getMaster()) {
      roomToJoin.setMaster(new _Player["default"]("Player", socket));
    } else {
      roomToJoin.addPlayer(new _Player["default"]("Player", socket));
    }

    if (!roomToJoin) {
      socket.emit("socket:error", "No room available ! Please try on another day !");
    }

    socket.join(roomToJoin.getName(), function (err) {
      if (err) socket.emit("socket:error", "Unabled to join room ! Please contact the Administrator");
      socket.emit("player:creation", roomToJoin.getName());
      socket.to(roomToJoin.getName()).emit("room:message", "Someone joined the ROOM !");
    });
    socket.on("disconnect", function () {
      console.log('A client has disapeared');
      socketServer.to(roomToJoin.getName()).emit('room:message', "Someone has left the ROOM !"); // TODO : Handle GAME Event (Charity PLEEEAAASSSEE !)
    });
    socket.on("player:creation", function (payload) {
      console.log("[LOG] data => ", payload);
    });
  });
  console.log("[LOG] Listen on http://127.0.0.1:3000");
});