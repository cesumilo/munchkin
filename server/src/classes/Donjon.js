/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 6:47:10 pm
 * @copyright APPI SASU
 */

import Card from "./Card";

export function defaultEffect() {
  console.warn("[LOG] enter defaultEffect");
  return null;
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
    if ((this._hasEffect || typeof this._hasEffect === "function" && this._effect(player) ) && !firstStage) {
      this.applyEffect(player)
    } else return false;
  }

  applyEffect(player) {
    console.log("[DONJON] #applyEffect::cards ", this.constructor.name)
    return this._effect(player)
  }
}