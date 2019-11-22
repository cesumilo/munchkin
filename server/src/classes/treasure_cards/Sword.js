import Equipment, { POSITION } from './Equipment';
import Player from '../Player';

export default class Sword extends Equipment {

  /**
   * @param {string} title title of the card
   * @param {number} strenght strength of the card
   * @param {(player) => void} effect function to apply on the player
   */
  constructor(title, strenght, effect) {
    super(title, POSITION.HAND, effect, null)
    this._strength = strenght;
    this._condition = this.canBeWear;
  }

  /**
   * @override
   * @param {Player} player 
   */
  canBeWear(player) {
    return player.has(this) < 2;
  }

}