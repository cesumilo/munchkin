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

export default class Game extends Observer {
  /**
   * 
   */
  constructure() {
    this._isLaunched = false;
    this._players = []
    this._stages = []
  }

  /**
   * 
   * @param {Array<Player>} players 
   * @param {Player} master 
   */
  startGame(players, master) {
    console.log("[GAME] Starting the game ! Enjoy")
    this._isLaunched = true;
    this._players = players
    const firstStage = new Stage(master, PREPARATION, null);
    this._stages.push(firstStage);
    players.forEach((p, index) => {
      this.subscribe(p, "stage:next", function (payload) {
        if (payload.stageName === END_TURN) {
          p.setCurrentStage(null);
          if (index + 1 < players.length) {
            const nextPlayer = players[index + 1];
            nextPlayer.setCurrentStage(new Stage(nextPlayer, PREPARATION, null));
          } else {
            const nextPlayer = players[0];
            nextPlayer.setCurrentStage()
          }
        }
      })
    })
  }



  endGame() {

  }

  isLaunched() {
    return this._isLaunched;
  }

}