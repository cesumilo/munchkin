/**
 * @author Alexandre SAISON <alexandre.saison.pro@gmail.com>
 * @file server main file
 * @desc Created on 2019-10-20 1:07:51 pm
 * @copyright APPI SASU
 */

import express from "express";
import helm from "helmet";
import cors from "cors";
import io from "socket.io";
import http from "http";

// Helpers
import { createRoom } from "./utils/helpers";
import socketHandler from "./utils/helpers/socketHandler";

// Routers
import defaultRouter from "./routes/default";

// Application
const expressServer = express();
const httpServer = http.createServer(expressServer);
const socketServer = io(httpServer);

expressServer.use(helm());
expressServer.use(cors());

// Serve files
expressServer.use(express.static("public"));

// TODO : Has to be moved to initiator of the GameServer
const availableRooms = [];
for (let i = 0; i < 3; i++) {
  availableRooms.push(createRoom());
}

httpServer.listen(
  process.env.NODE_ENV === "production" ? process.env.PORT : 3000,
  function() {
    socketServer.on("connection", socket =>
      socketHandler(socketServer, socket, availableRooms)
    );
    console.log(`[SERVER] Listen on http://127.0.0.1:3000`);
  }
);
