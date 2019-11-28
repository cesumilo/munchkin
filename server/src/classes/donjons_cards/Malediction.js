/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-11-19 3:36:11 pm
 * @copyright APPI SASU
 */
import Donjon, { defaultEffect } from '../Donjon';
import { TYPE } from '../../utils/actions/Card';
import Player, { CLASSES } from '../Player';

export default class Malediction extends Donjon {

  /**
   * @param {string} title Title of the Card
   * @param {(player) => boolean)} hasEffect tells if the Malediction has to be applyed
   * @param {(player) => void} effect effect to apply to the User 
   */
  constructor(title, effect= defaultEffect, hasEffect = hasEffect) {
    super(title, hasEffect, effect, TYPE.MALEDICTION);
  }

  /**
   * 
   * @param {Player} player the player that must match all the conditions to apply the effect
   * @param {[(player) => boolean]} conditions functions array which returns boolean values depending on the player succeed pass the checks
   */
  static hasEffect(player, conditions = []) {

    return conditions.every(c => c(player))
  }

  /**
   * 
   * @param {Player} player 
   */
  static handleMalediction(player) {
    console.log("[MALEDICTION][BEFORE] #handleMalediction::player_class => ", player.getClass())
    player.setClass(CLASSES.NONE);
    player.sendAttributes();
    console.log("[MALEDICTION][AFTER] #handleMalediction::player_class => ", player.getClass())
  }
}