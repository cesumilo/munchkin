/**
 * @author Guillaume Robin and Alexandre Saison <>
 * @file Description
 * @desc Created on 2019-11-01 1:19:30 pm
 * @copyright Creative Commons Attribution-NonCommercial 4.0 International License
 */

// Cards Types
import Monster from '../../classes/donjons_cards/Monster';
import PlayerClass from '../../classes/donjons_cards/Class';
import PlayerRace from '../../classes/donjons_cards/Race';
import LevelDown from '../../classes/treasure_cards/levelDown';
import LevelUp from '../../classes/treasure_cards/levelUp';
import Equipment from '../../classes/treasure_cards/Equipment';

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function generateCards() {
  return shuffle([
    new Monster("Grenouilles Volantes", 1, (...args) => {
      // TODO : handle this Fight
      console.log("[CARD] this card => ", this, args)
    }),
    new PlayerRace("Nain", player => PlayerRace.handleChangePlayerRace(player, "Nain")),
    new PlayerRace("Halfelin", player => PlayerRace.handleChangePlayerRace(player, "Halfelin")),
    new PlayerClass("Voleur", player => PlayerClass.handleChangePlayerClass(player, "Voleur")),
    new PlayerClass("Guerrier", player => PlayerClass.handleChangePlayerClass(player, "Guerrier")),
    new PlayerClass("Magicien", player => PlayerClass.handleChangePlayerClass(player, "Magicien")),
    new LevelUp("Pleurer dans les jupes du MJ", player => LevelUp.handleLevelUp(player)),
    new LevelDown("Trahison !!", player => LevelDown.handleLevelDown(player)),
    new Equipment("Epée qui donne du courage", player => Equipment.handleAddEquipment(player), () => true)
  ])
}