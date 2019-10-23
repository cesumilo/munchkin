/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 6:24:16 pm
 * @copyright APPI SASU
 */

import Player from '../classes/Player'

function ROOM_MANAGEMENT(availableRooms, socket, socketServer) {
  // Finding the first room which is available
  const roomToJoin = availableRooms.find(room => room.canBeJoined());

  if (!roomToJoin) {
    socket.emit("socket:error", `No room available ! Please try on another day !`);
  }

  // Handle master of the room creation
  if (!roomToJoin.getMaster()) {
    roomToJoin.setMaster(new Player(socket.id, socket, roomToJoin))
  } else {
    roomToJoin.addPlayer(new Player(socket.id, socket, roomToJoin))
  }

  socket.join(roomToJoin.getName(), (err) => {
    if (err) socket.emit("socket:error", `Unabled to join room ! Please contact the Administrator`);
    socket.emit("player:creation", roomToJoin.getName());
    socketServer.to(roomToJoin.getName()).emit("room:message", "Someone joined the ROOM !")
  })

  socket.on("disconnect", function () {
    socketServer.to(roomToJoin.getName()).emit('room:message', "Someone has left the ROOM !")
    roomToJoin.removePlayer(socket.id);
    // TODO : Handle GAME Event (Charity PLEEEAAASSSEE !)
  })
  return roomToJoin;
}

export default (socketServer, socket, availableRooms) => {
  ROOM_MANAGEMENT(availableRooms, socket, socketServer);
}