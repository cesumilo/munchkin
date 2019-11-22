/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 12:14:51 pm
 * @copyright APPI SASU
 */

import Player from './Player'
import Observer from "./others/Observer";
import { generateDonjons, generateTreasures } from "../utils/helpers/cards";
import { handleTurn } from '../utils/helpers/stages';

export default class Game extends Observer {

  constructor() {
    super();
    this._isLaunched = false;
    this._players = []
    this._stages = []
    this._cards = generateDonjons()
    this._treasures = generateTreasures();
  }

  initGame(players) {
    this._players = players
  }

  /**
   * 
   * @param {Array<Player>} players 
   * @param {Player} master 
   */
  startGame(players, master) {
    this._isLaunched = true;
    this._players = players
    if (!master || (!!master && !master instanceof Player))
      throw new Error("Master player must be provided as a player got => ", master)
    handleTurn(master, this._cards, this._stages);
    players.forEach((p, index) => {
      this.subscribe(p, "game:finish", () => this.endGame())
      this.subscribe(p, "stage:next", (payload) => {
        console.log(`${p.getName()} triggered next stage with => `, payload)
      })
      this.subscribe(p, "player:endturn", () => {
        const nextPlayer = players[index > players.length ? 0 : index]
        handleTurn(nextPlayer, this._cards, this._stages)
      })
    })
  }

  endGame() {
    this._players.forEach(p => p.getSocket().emit("game:end"));
  }

  isLaunched() {
    return this._isLaunched;
  }

}