/**
 * @author Alexandre Saison <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-11-22 10:18:49 am
 * @copyright APPI SASU
 */

import Donjon, { defaultEffect } from "../Donjon";
import { TYPE } from "../../utils/actions/Card";

export default class Monster extends Donjon {
  /**
   *
   * @param {string} title title of the card
   * @param {number} strength strength of the monster (level)
   * @param {[{nbLevel: number, nbTreasure: number}]} reward an Array of rewards (migth always be one object) may change in the future
   * @param {(player) => void} effect the function to apply to the player before the fight NOT IMPLEMENTED YET
   */
  constructor(title, strength, reward = [], effect = defaultEffect) {
    super(title, false, effect, TYPE.MONSTER);
    this.setReward(reward);
    this.setStrength(strength)
  }

  checkForReward(reward) {
    if (!Array.isArray(reward) || !reward.every(r => r.nbLevel && r.nbTreasure))
      throw new Error(
        "A reward must contains nbLevel and nbTreasure properties"
      );
    return true;
  }

  /**
   *
   * @param {[{nbTreasure: number, nbLevel: number}]} reward
   */
  setReward(reward) {
    if (this.checkForReward(reward)) this._reward = reward;
  }

  setStrength(strength) {
    if(strength < 0) throw new Error("Monster cannot have 0 strength");
    this._strength = strength;
  }

  getReward() {
    return this._reward;
  }

  getStrength() {
    return this._strength;
  }
}
