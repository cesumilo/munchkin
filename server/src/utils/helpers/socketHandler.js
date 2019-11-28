/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 6:24:16 pm
 * @copyright APPI SASU
 */

import Player from '../../classes/Player'
import Room from '../../classes/Room';
import { createRoom, joinRoom, sendMessageToRoom } from './rooms'
import { socketError } from './index'

/**
 * This handler takes care of disconnected event received from the "disconnected client" (using timeout ping event)
 * @param {SocketIO.Socket} socket socket of the client that is disconnected
 * @param {SocketIO.Server} socketServer server socket used to send messages
 * @param {Array<Room>} availableRooms Array of all available rooms 
 */
function handlerDisconect(socket, socketServer, availableRooms) {
  const supposedRooom = Room.getRoomWithSocketID(availableRooms, socket.id)
  if (!!supposedRooom) {
    const supposedPlayer = Player.getPlayerWithSocketID(supposedRooom, socket.id)
    if (!!supposedPlayer) {
      if (supposedRooom.isMaster(supposedPlayer.getID())) {
        sendMessageToRoom(socketServer, supposedRooom, `${supposedPlayer.getName()} alias Master a decider de mettre fin a la partie !`);
        supposedRooom.endGame();
      }
      sendMessageToRoom(socketServer, supposedRooom, `${supposedPlayer.getName()} a prit la fuite !`);
    } else {
      sendMessageToRoom(socketServer, supposedRooom, `Quelqu'un a prit la fuite !`);
    }
    socket.leaveAll()
    socketServer.to(supposedRooom.getName()).emit("room:update", { players: supposedRooom.getRoomPlayers() })
    supposedRooom.removePlayer(socket.id);
  }
}

/**
 * This handler takes care of room:join received by the client
 * @param {SocketIO.Socket} socket the socket to send errors and for player creation
 * @param {object} payload object received from the client who wants to join the room
 * @param {SocketIO.Server} socketServer the Server socket used to join the room
 * @param {Array<Room>} availableRooms Array of all available rooms
 */
function handlerJoinRoom(socketServer, socket, payload, availableRooms) {
  if (!payload.playerName || payload.playerName === "")
    return socketError(socket, "You must provide a username to play the game", true);
  const roomToJoin = Room.getRoomWithName(availableRooms, payload.roomName);
  if (!roomToJoin)
    return socketError(socket, `No room available ! Try to create one !`);
  else if (!roomToJoin.canBeJoined())
    return socketError(socket, `${roomToJoin.getName()} may be already launched or too many people are presents waiting to fight`, true);
  else if (roomToJoin.hasPlayerAlreadyExists(payload.playerName))
    return socketError(socket, "Oh mince un des joueur vous a piquer votre nom ! Vengez vous, mais avec un autre nom !", true);
  joinRoom(socketServer, socket, roomToJoin, payload.playerName);
}

/**
 * @param {any} socketServer Server socket
 * @param {Array<Room>} availableRooms all rooms avaibles
 * @param {SocketIO.Socket} socket the socket used to send first message to the client 
 * @param {object} payload object sent by the client to the server
 * @param {string} payload.roomName represents the name of the Room to create
 * @param {string} payload.playerName represents the name of the Master to create with the Room
 */
function handleRoomCreation(socketServer, socket, payload, availableRooms) {
  if (!!payload.roomName) {
    if (availableRooms.some(r => r.getName() === payload.roomName)) {
      return socketError(socket, "You can't create an already existing room !")
    } else {
      const newRoom = createRoom(socketServer, payload.roomName)
      availableRooms.push(newRoom);
      joinRoom(socketServer, socket, newRoom, payload.playerName);
      return sendMessageToRoom(socket, newRoom, `You created ${newRoom.getName()}`);
    }
  } else {
    socketError(socket, "You must provide payload object with name of the room", true);
  }
}

/**
 * All room management
 * @param {Array<Room>} availableRooms 
 * @param {SocketIO.Socket} socket 
 * @param {SocketIO.Server} socketServer 
 */
export function ROOM_MANAGEMENT(availableRooms, socket, socketServer) {
  socket.on("room:create", payload => handleRoomCreation(socketServer, socket, payload, availableRooms))
  socket.on("room:join", payload => handlerJoinRoom(socketServer, socket, payload, availableRooms))
  socket.on("disconnect", () => handlerDisconect(socket, socketServer, availableRooms))
  socket.on("player:message", payload => socketServer.to(payload.roomName).emit("room:message", { origin: payload.name, message: payload.message }))
  socket.on("game:start", payload => {
    const potentialRoom = Room.getRoomWithName(availableRooms, payload.roomName)
    if (potentialRoom && potentialRoom.isMaster(socket.id)) return potentialRoom.startGame()
    else
      return socketError(socket, `Ola tu n'es pas le maitre du monde ni le maitre de la room ! Demandes gentiment a ${potentialRoom._master.getName()}`, true);
  })
}