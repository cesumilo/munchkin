/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 12:14:51 pm
 * @copyright APPI SASU
 */

import Stage from "./Stage";
import Player from './Player'
import { PREPARATION, END_TURN } from "../actions/Stage";
import Observer from "./others/Observer";
import generateCards from "../helpers/cards";

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

  drawCard(player) {
    const card = this._cards.pop();
    if (!!card) {
      console.log(card, player);
      player.getCards([card]);
      return card;
    } else throw new Error("There is no card anymore !");
  }

  /**
   * 
   * @param {Array<Player>} players 
   * @param {Player} master 
   */
  startGame(players, master) {
    this._isLaunched = true;
    this._players = players
    if (!master || (!!master && !master instanceof Player)) {
      throw new Error("Master player must be provided as a player got => ", master)
    }
    const firstStage = new Stage(master, PREPARATION, null);
    firstStage.handleStage(() => {
      try {
        const potentialCard = this.drawCard(master);
        if (!!potentialCard && potentialCard.play(master)) {
          // TODO : HANDLE THIS !!
          console.log(`${potentialCard.getName()} has been drawn by ${master.getName()}`)
        }
      } catch (err) {
        console.error("ERROR => ", err)
        // TODO : Handle no card anymore !
      }
    })
    this._stages.push(firstStage);
    players.forEach((p, index) => {
      this.subscribe(p, "stage:next", (payload) => {
        if (!!payload && (payload.stageName === END_TURN && p.canFinishLap())) {
          p.setCurrentStage(null);
          let nextPlayer = null;
          if (index + 1 < players.length) nextPlayer = players[index + 1];
          else nextPlayer = players[0];
          const currentStage = new Stage(nextPlayer, PREPARATION, null)
          nextPlayer.setCurrentStage(currentStage);
          this._stages.push(currentStage)
        } else if (!payload) {
          console.log("[LOG] THis is the end turn")
        }
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