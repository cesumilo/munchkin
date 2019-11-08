import Donjon, { defaultEffect } from '../Donjon'
import { TYPE } from '../../utils/actions/Card'

export default class Monster extends Donjon {
  constructor(title, strength, effect = defaultEffect) {
    super(title, false, effect, TYPE.MONSTER)
    this._reward = null;
    this._strength = strength;
  }

  setReward(reward) {
    this._reward = reward;
  }

  getReward() {
    return this._reward;
  }

  getStrength() {
    return this._strength;
  }
}