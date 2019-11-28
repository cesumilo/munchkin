/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 11:48:04 am
 * @copyright APPI SASU
 */

import Card, { IEffect } from "./Card";
import { LEVEL_DOWN, LEVEL_UP, UPDATE_ATTR} from '../utils/actions/Effect'
import Player from "./Player";

export default class Treasure extends Card {

  /**
   * @param {string} title title of the Card
   * @param {string} type type can be Ring / Buff / Stuff
   * @param {function} effect function that takes player as parametter to apply everything it needs
   * @param {function} condition function that takes player as parametter to know if it's usable 
   */
  constructor(title, effect, condition) {
    super(title, "Treasure");
    this._effect = effect;
    this._condition = condition;
  }

  
  /**
   * Player will use the Card  
   * @override
   * @param {Player} player 
   * @param {boolean} firstStage
   */
  play(player, firstStage) {
    if(this._condition(player) && !firstStage) {
      this._effect.call(this, player)
    } else throw Error("Your player does not fill conditions to play this card")
  }

}