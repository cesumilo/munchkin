/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 12:14:51 pm
 * @copyright APPI SASU
 */
import Player from './Player'

export default class Game {
  constructure(room) {
    this._room = room
    this._isLaunched = false;
  }

  startGame() {
    this._isLaunched = true;
    // TODO : Handle starting game !!!
  }

  isLaunched() {
    return this._isLaunched;
  }

  appendPlayer(name, socket) {
    this._room.getPlayers().push(new Player(name, socket))
  }

  findPlayer(player) {
    return this._room.getPlayers().find(p => p.getID() === player.getID());
  }
}