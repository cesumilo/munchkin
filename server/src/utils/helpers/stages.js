/**
 * @author Guillaume Robin and Alexandre Saison <>
 * @file Description
 * @desc Created on 2019-11-08 8:10:41 am
 * @copyright Creative Commons Attribution-NonCommercial 4.0 International License
 */

// Classes
import Player from "../../classes/Player";
import Card from "../../classes/Card";
import Stage from "../../classes/Stage";
import Monster from "../../classes/donjons_cards/Monster";

// Constants
import { TYPE } from "../actions/Card";
import { PREPARATION, BATTLE, OPEN_DOOR } from "../actions/Stage";

/**
 * Helper for drawing cards for specific player
 * @param {Player} player the player who will draw cards
 * @param {number} counter the amount of cards to draw
 * @param {Array<Card>} availablesCards the list of available cards
 * @returns {Array<Card>} returns all drawn cards by the player
 */
export function drawCard(player, counter, availablesCards) {
  if (counter > availablesCards.length) {
    player.sendError(`You can't draw ${counter} when there is only ${availablesCards.length}`)
    throw new Error(`NOT_ENOUGH_CARDS in availableCards`)
  }
  const cardsToDraw = availablesCards.splice(0, counter);
  const cards = player.getCards(cardsToDraw)
  return cards;
}

/**
 * 
 * @param {Player} player player that has to open
 */
function handleOpenDoor(player, availablesCards) {
  try {
    drawCard(player, 1, availablesCards);
    player.sendAttributes()
  } catch (err) {
    console.error(`[STAGE] handleOpenDoor::err => `, err)
    player.sendError(err.message)
  }
}

/**
 * 
 * @param {Player} player player that will make the battle
 * @param {Array<Monster>} monsters 
 */
function handleBattleStage(player, monsters) {
  if (monsters.some(m => m._type !== TYPE.MONSTER))
    throw new Error("Monsters can only provides monsters !")
  if (monsters.some(m => !player.beat(m))) {
    console.log("[BATTLE] CHOUQUETTE")
    console.log("[BATTLE] monster => ", monsters)
    // TODO: handle asking for help
  } else {
    // TODO : handle fight
  }
}

/**
 * Handle PREPARATION Stage for the player 
 * @param {Player} player 
 * @param {Array<Card>} availableCards 
 */
function handlePreparation(player, availableCards) {
  const potentialCards = drawCard(player, 4, availableCards);
  if (!!potentialCard && Array.isArray(potentialCard) && potentialCards.length === 4) {
    console.log("[LOG] #handlePreparation")
    player.sendAttributes()
  } else {
    player.sendError("Oh mon dieu il n'y a pas assez de cartes !")
  }
}

/**
 * 
 * @param {Player} player player's turn
 * @param {Array<Card>} availablesCards available cards used for draw events
 * @param {Array<Stage>} allStages stages from the game (MADE FOR HISTORY)
 */
export function handleTurn(player, availablesCards, allStages) {
  const MINUTES = 60 * 1000;
  const firstStage = new Stage(player, OPEN_DOOR, battleStage, () => handleOpenDoor(player, availablesCards), 5000)
  const preparationStage = new Stage(player, PREPARATION, firstStage, () => handlePreparation(player, availablesCards), 3000);
  const battleStage = new Stage(player, BATTLE, firstStage, () => handleBattleStage(player, availablesCards.filter(c => c._type === TYPE.MONSTER)), 5000)
  preparationStage.startStage()
  allStages.push([
    preparationStage,
    firstStage,
    battleStage
  ])
}