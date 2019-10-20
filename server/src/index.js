/**
 * @author Alexandre SAISON <alexandre.saison.pro@gmail.com>
 * @file server main file
 * @desc Created on 2019-10-20 1:07:51 pm
 * @copyright APPI SASU
 */

import express from 'express';
import helm from 'helmet';
import cors from 'cors';
import io from 'socket.io';
import http from 'http';

// Helpers
import { createRoom } from './utils/helpers'

// Routers 
import defaultRouter from './routes/default';
import Player from './utils/classes/Player';

// Application
const expressServer = express();
const httpServer = http.createServer(expressServer);
const socketServer = io(httpServer);

expressServer.use(helm());
expressServer.use(cors());


// Routes
expressServer.use('/', defaultRouter(expressServer))

// TODO : Has to be moved to initiator of the GameServer
const availableRooms = [];
for (let i = 0; i < 10; i++) {
  availableRooms.push(createRoom());
}


httpServer.listen(process.env.NODE_ENV === "production" ? process.env.PORT : 3000, function () {
  socketServer.on("connection", function (socket) {
    // Finding the first room which is available
    const roomToJoin = availableRooms.find(room => room.canBeJoined());
    if (!roomToJoin) {
      socket.emit("socket:error", `No room available ! Please try on another day !`);
    }

    // Handle master of the room creation
    if (!roomToJoin.getMaster()) {
      roomToJoin.setMaster(new Player(`Player`, socket, roomToJoin))
    } else {
      roomToJoin.addPlayer(new Player(`Player`, socket, roomToJoin))
    }

    socket.join(roomToJoin.getName(), (err) => {
      if (err) socket.emit("socket:error", `Unabled to join room ! Please contact the Administrator`);
      socket.emit("player:creation", roomToJoin.getName());
      socketServer.to(roomToJoin.getName()).emit("room:message", "Someone joined the ROOM !")
    })

    socket.on("disconnect", function () {
      socketServer.to(roomToJoin.getName()).emit('room:message', "Someone has left the ROOM !")
      // TODO : Handle GAME Event (Charity PLEEEAAASSSEE !)
    })

    socket.on("player:creation", function (payload) {
      console.log(`[LOG] data => `, payload)
    })
  });


  console.log(`[LOG] Listen on http://127.0.0.1:3000`)
})