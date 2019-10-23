/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 12:14:51 pm
 * @copyright APPI SASU
 */

export default class Game {
  constructure() {
    this._isLaunched = false;
  }

  startGame(players) {
    console.log("[GAME] Starting the game ! Enjoy")
    this._isLaunched = true;
    // TODO : Handle starting game !!!
  }

  endGame() {

  }

  isLaunched() {
    return this._isLaunched;
  }

}