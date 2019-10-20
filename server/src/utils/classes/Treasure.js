/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 11:48:04 am
 * @copyright APPI SASU
 */

import Card, { IEffect } from "./Card";
import { LEVEL_DOWN, LEVEL_UP, UPDATE_ATTR} from '../actions/Effect'
import Player from "./Player";

export default class Treasure extends IEffect.apply(Card, []) {
  constructor(title) {
    super(title)

  }

  applyEffect(effect, player) { 
    if (player instanceof Player) {
      switch(effect.action) {
        case LEVEL_UP: 
        case LEVEL_DOWN:
          player.updateLevel(effect.payload);
          break;
        case UPDATE_ATTR : 
          // TODO : Handle this with the cards
        default : 
          return player
      }
    } else throw new Error(`player must be an instance of Player`)
  }

}