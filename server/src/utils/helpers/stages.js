/**
 * @author Guillaume Robin and Alexandre Saison <>
 * @file Description
 * @desc Created on 2019-11-08 8:10:41 am
 * @copyright Creative Commons Attribution-NonCommercial 4.0 International License
 */
import Player from "../../classes/Player";
import Card from "../../classes/Card";
import { DRAW_CARD } from "../actions/Player";
import Stage from "../../classes/Stage";
import { PREPARATION, BATTLE, OPEN_DOOR } from "../actions/Stage";
import { TYPE } from "../actions/Card";
import Monster from "../../classes/donjons_cards/Monster";

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
    throw new Error("NOT_ENOUGH_CARDS")
  }
  const cardsToDraw = availablesCards.splice(0, counter);
  const cards = player.getCards(cardsToDraw)
  player.getSocket().emit("player:draw", {
    action: DRAW_CARD,
    payload: {
      cards,
      socketID: player.getID(),
    }
  })
  return cards;
}

/**
 * 
 * @param {Player} player player that has to open
 */
function handleOpenDoor(player, availablesCards) {
  try {
    console.log("[LOG] handleOpenDoor::player => ", player);
    console.log("[LOG] handleOpenDoor::cards => ", availablesCards);
    const potentialCard = drawCard(player, 1, availablesCards);
    console.log(`${potentialCard.getName()} has been drawn by ${player.getName()}`)
    if (!!potentialCard && Array.isArray(potentialCard)) {
      console.log(`[LOG] ${potentialCard}`)
    }
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
  const firstStage = new Stage(player, OPEN_DOOR, battleStage, () => handleBattleStage(player, availablesCards.filter(c => c._type === TYPE.MONSTER)), 5000)
  const preparationStage = new Stage(player, PREPARATION, firstStage, () => null, 3000);
  const battleStage = new Stage(player, BATTLE, null, () => handleOpenDoor(player, availablesCards), 5000)
  preparationStage.startStage()
  allStages.push([
    preparationStage,
    firstStage,
    battleStage
  ])
}