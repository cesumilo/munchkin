/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 6:47:10 pm
 * @copyright APPI SASU
 */

import Card from "./Card";

/**
 * @param {Player} player the player to apply effect to 
 * @returns {boolean} returns true if it succeed
 */
export function defaultEffect(player) {
  console.warn("[LOG] enter defaultEffect has player as Parameter");
  return true;
}

export default class Donjon extends Card {
  constructor(title, hasEffect, effect = defaultEffect, typeName = "Donjon") {
    super(title, typeName);
    this._hasEffect = hasEffect;
    this._effect = effect
  }

  /**
   * Play the Card by Player
   * @param {Player} player the player that play the card
   * @param {boolean} firstStage to predict if it has to proc without player agreement.
   */
  play(player, firstStage) {
    if ((this._hasEffect || typeof this._hasEffect === "function" && this.hasEffect(player) ) && !firstStage) {
      return this.applyEffect(player)
    } else return false;
  }

  applyEffect(player) {
    return this._effect(player)
  }
}