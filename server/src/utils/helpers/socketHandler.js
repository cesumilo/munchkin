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
export function joinRoom(socketServer, socket, room, playerName) {
  const player = new Player(playerName, socket, room);

  // Set a Room master if there is none or only join the Room
  if (!room.getMaster())
    room.setMaster(player)
  else
    room.addPlayer(player)

  // Handle player joining room
  socket.join(room.getName(), (err) => {
    if (err) return socket.emit("socket:error", `Unabled to join room ! Please contact the Administrator`);
    player.getSocket().emit("room:joined", room.getName());
    player.getSocket().emit("room:update", { players: room.getRoomPlayers() })
    socketServer.to(room.getName()).emit("room:message", { origin: "Server", message: `${player.getName()} joined the room !` })
  })
}

/**
 * 
 * @param {Array<Room>} availableRooms 
 * @param {SocketIO.Socket} socket 
 * @param {SocketIO.Server} socketServer 
 */
export function ROOM_MANAGEMENT(availableRooms, socket, socketServer) {

  /**
   * @param {string} payload.roomName represents the name of the Room to create
   * @param {string} payload.playerName represents the name of the Master to create with the Room
   */
  socket.on("room:create", payload => {
    if (!!payload.roomName) {
      if (availableRooms.some(r => r.getName() === payload.roomName)) {
        return socket.emit("socket:error", "You can't create an already existing room !")
      } else {
        const newRoom = createRoom(socketServer, payload.roomName)
        availableRooms.push(newRoom);
        joinRoom(socketServer, socket, newRoom, payload.playerName);
        socket.emit("room:meesage", { origin: 'Server', message: `You created ${newRoom.getName()}` });
      }
    } else {
      socket.emit("socket:error", "You must provide payload object with name of the room", true);
    }
  })

  socket.on("room:join", payload => {
    // Finding the first room which is available
    console.log(`[SERVER] room:join::payload => `, payload)
    const roomToJoin = availableRooms.find(room => room.canBeJoined() && room.getName() === payload.roomName);
    if (!payload.playerName || payload.playerName === "") socket.emit("socket:error", "You must provide a username to play the game", true);
    else if (!roomToJoin) socket.emit("socket:error", `No room available ! Try to create one !`);
    else if (roomToJoin.getPlayers().some(p => p.getName() === payload.playerName)) socket.emit("socket:error", "Oh mince un des joueur vous a piquer votre nom ! Vengez vous, mais avec un autre nom !", true);
    else joinRoom(socketServer, socket, roomToJoin, payload.playerName);
  })

  socket.on("player:message", payload => {
    socketServer.to(payload.roomName).emit("room:message", { origin: payload.name, message: payload.message })
  })

  /**
   * @param {object} payload represents values that are given to the server using socket.io
   * @param {string} payload.socketID represents socket id given by the client to check for isMaster
   * @param {object} payload.roomName represents the room name to find
   */
  socket.on("game:start", payload => {
    const potentialRoom = Room.getRoomWithName(availableRooms, payload.roomName)
    if (potentialRoom && potentialRoom.isMaster(socket.id)) potentialRoom.startGame()
    else socket.emit("socket:error", `Ola malheureux tu n'est pas le maitre du monde ni le maitre de la room ! Demande gentiment a ${potentialRoom._master.getName()}`);
  })

  socket.on("disconnect", function (reason) {
    if (reason === 'io server disconnect') {
      socket.connect(); //When server trigger this, we can to reconnect manually
    } else {
      console.log(`[SERVER] #onDisconnect::reason => ${reason}`)
      const supposedRooom = Room.getRoomWithSocketID(availableRooms, socket.id)
      if (!!supposedRooom) {
        console.log(`[SERVER] #onDisconnect::supposedRoom => `, supposedRooom);
        const supposedPlayer = Player.getPlayerWithSocketID(supposedRooom, socket.id)
        if (!!supposedPlayer) {
          if (supposedRooom.isMaster(supposedPlayer.getID())) supposedRooom.endGame()
          socketServer.to(supposedRooom.getName()).emit('room:message', { origin: 'Server', message: `${supposedPlayer.getName()} a prit prendre la fuite !` })
        } else {
          socketServer.to(supposedRooom.getName()).emit('room:message', { origin: 'Server', message: "Quelqu'un a prit prendre la fuite !" })
        }
        socket.leaveAll()
        socketServer.to(supposedRooom.getName()).emit("room:update", { players: supposedRooom.getRoomPlayers() })
        supposedRooom.removePlayer(socket.id);
      }
    }
  })

}