/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 5:35:03 pm
 * @copyright APPI SASU
 */
``
import Room from "../classes/Room"

let indexRoomToCreate = 0;
export const createRoom = () => {
  return new Room(++indexRoomToCreate);
}