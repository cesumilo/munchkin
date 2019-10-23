"use strict";

var _express = _interopRequireDefault(require("express"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cors = _interopRequireDefault(require("cors"));

var _socket = _interopRequireDefault(require("socket.io"));

var _http = _interopRequireDefault(require("http"));

var _path = _interopRequireDefault(require("path"));

var _helpers = require("./utils/helpers");

var _socketHandler = _interopRequireDefault(require("./utils/helpers/socketHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @author Guillaume Robin and Alexandre Saison <>
 * @file Index file for munchkin server
 * @desc Created on 2019-10-23 9:35:00 pm
 * @copyright Creative Commons Attribution-NonCommercial 4.0 International License
 */
// Helpers
// Application
var expressServer = (0, _express["default"])();

var httpServer = _http["default"].createServer(expressServer);

var socketServer = (0, _socket["default"])(httpServer);
expressServer.use((0, _helmet["default"])());
expressServer.use((0, _cors["default"])()); // Serve files

expressServer.use(_express["default"]["static"]("public")); // TODO : Has to be moved to initiator of the GameServer

var availableRooms = [];

for (var i = 0; i < 3; i++) {
  availableRooms.push((0, _helpers.createRoom)());
}

httpServer.listen(process.env.NODE_ENV === "production" ? process.env.PORT : 3000, function () {
  socketServer.on("connection", function (socket) {
    return (0, _socketHandler["default"])(socketServer, socket, availableRooms);
  });
  console.log("[SERVER] Listen on http://127.0.0.1:3000");
});