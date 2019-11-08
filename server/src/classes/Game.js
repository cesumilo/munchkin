/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 12:14:51 pm
 * @copyright APPI SASU
 */

import Player from './Player'
import Observer from "./others/Observer";
import generateCards from "../utils/helpers/cards";
import { drawCard, handleTurn } from '../utils/helpers/stages';

export default class Game extends Observer {

  constructor() {
    super();
    this._isLaunched = false;
    this._players = []
    this._stages = []
    this._cards = generateCards()
  }

  initGame(players) {
    this._players = players
  }

  /**
   * 
   * @param {Player} player player that will draw cards
   */
  drawCard(player) {
    if (player instanceof Player) {
      const card = drawCard(player, 1, this._cards);
      console.log('[LOG] card drawn => ', card)
      return card
    } else throw new Error("player must be a Player instance")
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
      this.subscribe(p, "stage:next", (payload) => {
        console.log(`${p.getName()} triggered next stage with => `, payload)
      })
      this.subscribe(p, "stage:end", (payload) => {
        handleTurn(players[index > players.length ? 0 : index], this._cards, this._stages)
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