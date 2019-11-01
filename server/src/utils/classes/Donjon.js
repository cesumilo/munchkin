/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 6:47:10 pm
 * @copyright APPI SASU
 */

import Card from "./Card";

export default class Donjon extends Card {
  constructor(title, hasEffect, effect = () => null) {
    super(title, "D");
    this._hasEffect = hasEffect;
    this._effect = effect
  }

  play(player) {
    if(this._hasEffect) {
      console.log("It has effect !")
      this.applyEffect(player)
    } else return false;
  }

  applyEffect(player) {
    console.log("[DONJON] player => ", player)
    return this._effect(player)
  }
}