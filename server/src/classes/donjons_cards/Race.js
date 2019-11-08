/**
 * @author Guillaume Robin and Alexandre Saison <>
 * @file Description
 * @desc Created on 2019-11-08 11:24:08 am
 * @copyright Creative Commons Attribution-NonCommercial 4.0 International License
 */

import Donjon, { defaultEffect } from '../Donjon'
import { TYPE } from '../../utils/actions/Card'
import Player from '../Player';

export default class PlayerRace extends Donjon {
  constructor(title, effect = defaultEffect) {
    super(title, true, effect, TYPE.CLASS);
  }

  /*
   * Handle Change player Race
   * @param {Player} player player to trigger the changing race
   * @param {string} className the new class to be applyed on Player 
   */
  static handleChangePlayerRace(player, race) {
    if (!player || !(player instanceof Player))
      throw new Error("Player must be an instance of player")
    player.setRace(race);
    player.sendAttributes();
  }
}
