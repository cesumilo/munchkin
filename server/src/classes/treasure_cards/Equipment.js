/**
 * @author Guillaume Robin and Alexandre Saison <>
 * @file Description
 * @desc Created on 2019-11-12 5:19:47 pm
 * @copyright Creative Commons Attribution-NonCommercial 4.0 International License
 */

import Treasure from '../Treasure';
import { TYPE } from '../../utils/actions/Card';
import Player from '../Player';

export const POSITION = {
  HELMET: "HELMET",
  CHEST: "CHEST",
  HAND: "HAND",
  FEET: "FEET"
}

export default class Equipment extends Treasure {

  /**
   * @param {string} title title of the Equipment card
   * @param {string} position position of the equipment
   * @param {(player) => void} effect effect to apply to the user
   * @param {(player) => boolean} condition condition to pass to apply the effect function
   */
  constructor(title, position, effect, condition) {
    super(title, effect, condition);
    this._type = TYPE.EQUIPMENT;
    this._strength = 0;
    this._position = position
  }

  set position(position) {
    if (!Object.keys(POSITION).some(e => e === position))
      throw new Error("Position must be one of POSITION object")
    this._position = position
  }

  get position() {
    return this._position;
  }

  /**
   * @param {Player} player the player that want to wear this equipment
   * @returns {boolean} returns true if this equipment can be wear by player
   */
  canBeWear(player) {
    return true;
  }

  getPosition() {
    return this._position;
  }

  /**
   * @return {number} returns the strength of the card to add to the player strength
   */
  getValue() {
    return this._strength;
  }

  /**
   * @param {Player} player the player who adds the equipment
   */
  static handleAddEquipment(player) {
    throw new Error("Method not implemented yet");
  }


}