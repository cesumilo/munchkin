/**
 * @author Guillaume Robin and Alexandre Saison <>
 * @file Description
 * @desc Created on 2019-11-08 8:10:41 am
 * @copyright Creative Commons Attribution-NonCommercial 4.0 International License
 */

// Classes
import Player from "../../classes/Player";
import Card from "../../classes/Card";
import Stage, { MINUTE } from "../../classes/Stage";
import Monster from "../../classes/donjons_cards/Monster";

// Constants
import { TYPE } from "../actions/Card";
import {
  PREPARATION,
  BATTLE,
  OPEN_DOOR,
  WAITING,
  END_TURN
} from "../actions/Stage";

/**
 * Helper for drawing cards for specific player
 * @param {Player} player the player who will draw cards
 * @param {number} counter the amount of cards to draw
 * @param {Array<Card>} availablesCards the list of available cards
 * @returns {Array<Card>} returns all drawn cards by the player
 */
export function drawCard(player, counter, availablesCards) {
  if (counter > availablesCards.length) {
    player.sendError(
      `You can't draw ${counter} when there is only ${availablesCards.length}`
    );
    throw new Error(`NOT_ENOUGH_CARDS in availableCards`);
  }
  const cardsToDraw = availablesCards.splice(0, counter);
  player.addCards(cardsToDraw);
  return [cardsToDraw];
}

function generateStage(player, stageName, next, handler, TTL = 2 * MINUTE) {
  return () => new Stage(player, stageName, next, handler, TTL);
}

/**
 *
 * @param {Player} player player that has to open
 */
function handleOpenDoor(player, availablesCards) {
  try {
    const cards = drawCard(player, 1, availablesCards);
    player.sendAttributes();
    if (cards.some(c => c.isA(TYPE.MONSTER))) {
      console.log("[STAGES] #handleOpenDoor : found a monster");
      debugger;
      return generateStage(
        player,
        BATTLE,
        () => null,
        handleBattleStage(player, cards)
      );
    } else if (cards.some(c => c.isA(TYPE.MALEDICTION))) {
      console.log("[STAGES] #handleOpenDoor : found a malediction");
      cards.forEach(c => c.play(player, false));
      // TODO : Handle next stage when getting cards like MALEDICTION
      return generateStage(
        player,
        END_TURN,
        () => null,
        () => console.log("[STAGE] #endTurn"),
        1500
      );
    } else {
      console.log(
        "[STAGES] #handleOpenDoor : found no monster nor malediction found"
      );
      return generateStage(
        player,
        WAITING,
        () => null,
        () => console.log("[STAGE] #waitingStage")
      );
    }
  } catch (err) {
    console.error(`[STAGE] handleOpenDoor::err => `, err);
    player.sendError(err.message);
    debugger;
  }
}

/**
 *
 * @param {Player} player player that will make the battle
 * @param {Array<Monster>} monsters
 */
function handleBattleStage(player, monsters) {
  if (monsters.some(m => m._type !== TYPE.MONSTER)) {
    monsters.forEach(m =>
      console.log("[BATTLE] #handleBattleStage::monster => ", m._type)
    );
    throw new Error("Monsters can only provides monsters !");
  }
  console.log(
    `[BATTLE] ${player.getName()} has ${player.getStrength()} strength`
  );
  monsters.forEach(m =>
    console.log(`[BATTLE] ${m.getName()} has ${m.getStrength()} strength`)
  );
  if (monsters.some(m => !player.beat(m))) {
    console.log("[BATTLE] CHOUQUETTE");
    player.sendError("You must ask for Help");
  } else {
    console.log("[BATTLE] You can win the fight !!");
    monsters.forEach(m =>
      console.log(`[${m.getName()}] gives reward of : ${m.getReward()}`)
    );
  }
}

/**
 * Handle PREPARATION Stage for the player
 * @param {Player} player
 * @param {Array<Card>} availableCards
 */
function handlePreparation(player) {
  try {
    console.log("[LOG] #handlePreparation");
    player.sendAttributes();
  } catch (err) {
    player.sendError(err.message);
    console.log("[ERR] err => ", err);
    debugger; //eslint-disable-line
  }
}

/**
 *
 * @param {Player} player player's turn
 * @param {Array<Card>} availablesCards available cards used for draw events
 * @param {Array<Stage>} allStages stages from the game (MADE FOR HISTORY)
 */
export function handleTurn(player, availablesCards, allStages) {
  debugger;
  const firstStage = new Stage(
    player,
    OPEN_DOOR,
    null,
    () => handleOpenDoor(player, availablesCards),
    5000
  );
  const preparationStage = new Stage(
    player,
    PREPARATION,
    firstStage,
    () => handlePreparation(player, availablesCards),
    3000
  );
  const endTurnStage = new Stage(
    player,
    END_TURN,
    firstStage,
    () => null,
    3000
  );
  const chooseCardStage = new Stage(
    player,
    WAITING,
    endTurnStage,
    () => null,
    3000
  );
  preparationStage.startStage();
  allStages.push([preparationStage, firstStage, endTurnStage, chooseCardStage]);
}
