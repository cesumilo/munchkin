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
    new PlayerRace("Nain", true, player => PlayerRace.handleChangePlayerRace(player, "Nain")),
    new PlayerRace("Halfelin", true, player => PlayerRace.handleChangePlayerRace(player, "Halfelin")),
    new PlayerClass("Voleur", true, player => PlayerClass.handleChangePlayerClass(player, "Voleur")),
    new PlayerClass("Guerrier", true, player => PlayerClass.handleChangePlayerClass(player, "Guerrier")),
    new PlayerClass("Magicien", true, player => PlayerClass.handleChangePlayerClass(player, "Magicien")),
    new LevelUp("Pleurer dans les jupes du MJ", player => LevelUp.handleLevelUp(player), player => player.getLevel() < 9),
    new LevelDown("Trahison !!", player => LevelDown.handleLevelDown(player), player => player.getLevel() < 9)
  ])
}