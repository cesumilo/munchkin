"use strict";

var _express = _interopRequireDefault(require("express"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cors = _interopRequireDefault(require("cors"));

var _socket = _interopRequireDefault(require("socket.io"));

var _http = _interopRequireDefault(require("http"));

var _helpers = require("./utils/helpers");

var _socketHandler = _interopRequireDefault(require("./utils/helpers/socketHandler"));

var _default = _interopRequireDefault(require("./routes/default"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @author Alexandre SAISON <alexandre.saison.pro@gmail.com>
 * @file server main file
 * @desc Created on 2019-10-20 1:07:51 pm
 * @copyright APPI SASU
 */
// Helpers
// Routers
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