/**
 * @author Guillaume Robin and Alexandre Saison <>
 * @file Description
 * @desc Created on 2019-11-01 1:19:30 pm
 * @copyright Creative Commons Attribution-NonCommercial 4.0 International License
 */

// Cards Types
import Monster from "../../classes/donjons_cards/Monster";
import PlayerClass from "../../classes/donjons_cards/Class";
import PlayerRace from "../../classes/donjons_cards/Race";
import LevelDown from "../../classes/treasure_cards/levelDown";
import LevelUp from "../../classes/treasure_cards/levelUp";
import Equipment, { POSITION } from "../../classes/treasure_cards/Equipment";
import Card from "../../classes/Card";
import Malediction from "../../classes/donjons_cards/Malediction";
import { RACES, CLASSES } from "../../classes/Player";

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 *  @returns {Array<Card>} returns all the available cards in the game
 */
export default function generateCards() {
  return shuffle([...generateDonjons(), ...generateTreasures()]);
}

global.generateCards = generateCards;

export function generateTreasures() {
  return shuffle([
    new LevelUp("Pleurer dans les jupes du MJ", player =>
      LevelUp.handleLevelUp(player)
    ),
    new LevelDown("Trahison !!", player => LevelDown.handleLevelDown(player)),
    new Equipment(
      "Epée qui donne du courage",
      POSITION.HAND,
      player => Equipment.handleAddEquipment(player),
      () => true
    )
  ]);
}

export function generateDonjons() {
  return shuffle([
    new Monster(
      "Grenouilles Volantes",
      1,
      [{ nbLevel: 1, nbTreasure: 1 }],
      player => {
        console.log("[CARD] this card => ", this);
      }
    ),
    new PlayerRace("Nain", player =>
      PlayerRace.handleChangePlayerRace(player, RACES.DWARF)
    ),
    new PlayerRace("Halfelin", player =>
      PlayerRace.handleChangePlayerRace(player, RACES.HOBBIT)
    ),
    new PlayerClass("Voleur", player =>
      PlayerClass.handleChangePlayerClass(player, CLASSES.THIEF)
    ),
    new PlayerClass("Guerrier", player =>
      PlayerClass.handleChangePlayerClass(player, CLASSES.WARRIOR)
    ),
    new PlayerClass("Magicien", player =>
      PlayerClass.handleChangePlayerClass(player, CLASSES.WIZARD)
    ),
    new Malediction("Tu perd ta classe", player =>
      Malediction.handleMalediction(player)
    )
  ]);
}

global.allCards = generateCards();
