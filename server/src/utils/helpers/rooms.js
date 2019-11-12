/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 5:35:03 pm
 * @copyright APPI SASU
 */

import Room from "../../classes/Room"
import Player from "../../classes/Player"

let indexRoomToCreate = 0;

/**
 * Helper to create a Room 
 * @param {SocketIO.Server} socketServer 
 * @param {string} name name of the room to create
 */
export function createRoom(socketServer, name = `Room-${indexRoomToCreate}`) {
  return new Room(socketServer, name);
}

/**
 * Used to handle player creation and makes him join the room
 * @param {SocketIO.Client} socket use to the Player instance
 * @param {Room} room instance of the Room to join
 * @param {string} playerName name of the master player that has created the Room
 */
export function joinRoom(socketServer, socket, room, playerName) {
  const player = new Player(playerName, socket);

  // Set a Room master if there is none or only join the Room
  if (!room.getMaster())
    room.setMaster(player)
  else
    room.addPlayer(player)

  // Handle player joining room
  socket.join(room.getName(), (err) => {
    if (err) return socketError(socket, `Unabled to join room ! Please contact the Administrator`);
    player.getSocket().emit("room:joined", room.getName());
    player.getSocket().emit("room:update", { players: room.getRoomPlayers() });
    sendMessageToRoom(socketServer, room, `${player.getName()} joined the room !`);
  })
}

/**
 * @param {SocketIO.Socket} socket the socket that will send the room message
 * @param {Room} room the room instance to send the message
 * @param {string} message the message to send to the room
 */
export function sendMessageToRoom(socket, room, message) {
  return socket.to(room.getName()).emit('room:message', { origin: 'Server', message })
}

