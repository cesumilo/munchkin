/**
 * @author Guillaume Robin and Alexandre Saison <>
 * @file Index file for munchkin server
 * @desc Created on 2019-10-23 9:35:00 pm
 * @copyright Creative Commons Attribution-NonCommercial 4.0 International License
 */
import express from "express";
import helm from "helmet";
import cors from "cors";
import io from "socket.io";
import http from "http";

// Helpers
import { createRoom } from "./utils/helpers/rooms";
import { ROOM_MANAGEMENT } from "./utils/helpers/socketHandler";

// Application
const availableRooms = [];
const expressServer = express();
const httpServer = http.createServer(expressServer);
const socketServer = io(httpServer);

expressServer.use(helm());
expressServer.use(cors());

// Serve files
expressServer.use(express.static("public"));

expressServer.get("/rooms", function (req, res) {
  res.json(availableRooms.map(m => ({ name : m.getName(), takenSeats : `${m.getPlayers().length} / 6`})));
})

httpServer.listen(
  process.env.NODE_ENV === "production" ? process.env.PORT : 3000,
  () => {
    console.log(`[SERVER] Listen on http://127.0.0.1:3000`);
    for (let i = 0; i < 3; i++) availableRooms.push(createRoom(socketServer, `Room-${i}`));
    socketServer.on("connection", socket => ROOM_MANAGEMENT(availableRooms, socket, socketServer))
  }
) 
