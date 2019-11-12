/**
 * @author Guillaume Robin and Alexandre Saison <>
 * @file Description
 * @desc Created on 2019-11-12 5:19:47 pm
 * @copyright Creative Commons Attribution-NonCommercial 4.0 International License
 */

import Treasure from '../Treasure';
import { TYPE } from '../../utils/actions/Card';
import Player from '../Player';

export default class Equipment extends Treasure {

  /**
   * @param {string} title title of the Equipment card
   * @param {(player) => void} effect effect to apply to the user
   * @param {(player) => boolean} condition condition to pass to apply the effect function
   */
  constructor(title , effect, condition) {
    super(title, effect, condition);
    this._type = TYPE.EQUIPMENT;
    this._strength = 0;
  }

  /**
   * @return {number} returns the strength of the card to add to the player strength
   */
  getValue() {
    return this._strength;
  }

  /**
   * 
   * @param {Player} player the player who adds the equipment
   */
  static handleAddEquipment(player) {
    throw new Error("Method not implemented yet");
  }


}