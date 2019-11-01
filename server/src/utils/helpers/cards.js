/**
 * @author Guillaume Robin and Alexandre Saison <>
 * @file Description
 * @desc Created on 2019-11-01 1:19:30 pm
 * @copyright Creative Commons Attribution-NonCommercial 4.0 International License
 */

import Donjon from '../classes/Donjon';
import Player from '../classes/Player';

export default function generateCards() {
  return [
    new Donjon("Grenouilles Volantes", true, (...args) => {
      console.log("ARGS =>", args);
    }),
    new Donjon("Voleur", true, (...args) => {
      console.log("ARGS => ", args);
      if (args[0] instanceof Player) {
        const player = args[0];
        player.setRace("Voleur");
        console.log("PLAYER => ", player)
      }
    })
  ]
}