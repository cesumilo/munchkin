/**
 * @author Guillaume Robin and Alexandre Saison <>
 * @file Description
 * @desc Created on 2019-11-08 1:13:19 pm
 * @copyright Creative Commons Attribution-NonCommercial 4.0 International License
 */

import Treasure from '../Treasure';
import { defaultEffect } from '../Donjon';
import Player from '../Player';

export default class LevelUp extends Treasure {
  /**
   * @param {string} title title of the Card
   * @param {(player) => void} effect effect to apply to a player
   * @param {(player) => boolean} condition conditions to check before applying the effect
   */
  constructor(title, effect= defaultEffect, condition) {
    super(title, effect, condition)
  }

  /**
   * Handler for leveling up a specified player
   * @param {Player} player player to level up
   */
  static handleLevelUp(player) {
    player.updateLevel(1)
  }
}