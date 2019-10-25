/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 5:35:03 pm
 * @copyright APPI SASU
 */
``
import Room from "../classes/Room"

let indexRoomToCreate = 0;

/**
 * Helper to create a Room 
 * @param {SocketIO.Server} socketServer 
 * @param {string} name name of the room to create
 */
export const createRoom = (socketServer, name = `Room-${indexRoomToCreate}`) => {
  return new Room(socketServer, name);
}