/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 11:48:04 am
 * @copyright APPI SASU
 */

import Card, { IEffect } from "./Card";
import { LEVEL_DOWN, LEVEL_UP, UPDATE_ATTR} from '../actions/Effect'
import Player from "./Player";

export default class Treasure extends Card {

  /**
   * @param {string} title of the Card
   * @param {string} type can be Ring / Buff / Stuff
   * @param {function} effect function that takes player as parametter to apply everything it needs
   * @param {function} condition function that takes player as parametter to know if it's usable 
   */
  constructor(title, type, effect, condition) {
    super(title)
    this._type = type;
    this._effect = effect;
    this._condition = condition;
  }

  
  /**
   * Player will use the Card  
   * @param {Player} player 
   */
  use(player) {
    if(this._condition(player)) {
      this._effect(player)
    }
  }

}