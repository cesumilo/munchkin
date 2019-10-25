/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 6:24:16 pm
 * @copyright APPI SASU
 */

import Player from '../classes/Player'
import Room from '../classes/Room';
import { createRoom } from '../helpers/index'

/**
 * 
 * @param {SocketIO.Client} socket use to the Player instance
 * @param {Room} room instance of the Room to join
 * @param {string} playerName name of the master player that has created the Room
 */
export function joinRoom(socket, room, playerName) {
  const player = new Player(playerName, socket, room);

  // Set a Room master if there is none or only join the Room
  if (!room.getMaster())
    room.setMaster(player)
  else
    room.addPlayer(player)
  
  // Handle player joining room
  socket.join(room.getName(), (err) => {
    if (err) return socket.emit("socket:error", `Unabled to join room ! Please contact the Administrator`);
    socketServer.to(room.getName()).emit("room:message", "Someone joined the ROOM !")
  })
}

/**
 * 
 * @param {Array<Room>} availableRooms 
 * @param {SocketIO.Socket} socket 
 * @param {SocketIO.Server} socketServer 
 */
export function ROOM_MANAGEMENT(availableRooms, socket, socketServer) {
  let connectionAttempt = 0;

  /**
   * @param {string} payload.roomName represents the name of the Room to create
   * @param {string} payload.playerName represents the name of the Master to create with the Room
   */
  socket.on("room:create", payload => {
    if (!!payload.roomName) {
      const newRoom = createRoom(socketServer, payload.roomName)
      availableRooms.push(newRoom);
      joinRoom(socket, newRoom, payload.playerName);
      socket.emit("room:meesage", `You created ${newRoom.getName()}`);
    } else {
      socket.emit("socket:error", "You must provide payload object with name of the room");
    }
  })

  socket.on("room:join", payload => {
    // Finding the first room which is available
    const roomToJoin = availableRooms.find(room => room.canBeJoined() && room.getName() === payload.room.name);
    if (!roomToJoin) socket.emit("socket:error", `No room available ! Try to create one !`);
    joinRoom(roomToJoin);
  })

  /**
   * @param {object} payload represents values that are given to the server using socket.io
   * @param {string} payload.socketID represents socket id given by the client to check for isMaster
   * @param {object} payload.roomName represents the room name to find
   */
  socket.on("game:start", payload => {
    const potentialRoom = Room.getRoom(availableRooms, payload.roomName)
    if (potentialRoom.isMaster(payload.socketID)) potentialRoom.startGame()
    else socket.emit("socket:error", `You must be the Room master to launch the game`);
  })


  socket.on("disconnect", function () {
    if (++connectionAttempt > 3) {
      socket.leaveAll()
      socketServer.to(roomToJoin.getName()).emit('room:message', "Someone has internet connection issue !")
      roomToJoin.removePlayer(socket.id);
      // TODO : Handle GAME Event (Charity PLEEEAAASSSEE !)
    } else {
      //TODO : Reconnection attempt 
    }
  })

}