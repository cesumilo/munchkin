import Donjon, { defaultEffect } from '../Donjon';
import { TYPE } from '../../utils/actions/Card';

export default class Malediction extends Donjon {
  /**
   * @param {string} title Title of the Card
   * @param {(player) => boolean)} hasEffect tells if the Malediction has to be applyed
   * @param {(player) => void} effect effect to apply to the User 
   */
  constructor(title, hasEffect, effect = defaultEffect) {
    super(title, hasEffect , effect, TYPE.MALEDICTION);
  }
}