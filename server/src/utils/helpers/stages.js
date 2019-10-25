import Player from "../classes/Player";
import Card from "../classes/Card";
import { DRAW_CARD } from "../actions/Player";

/**
 * 
 * @param {Player} player 
 * @param {number} counter 
 * @param {Array<Card>} availablesCards 
 */
export function drawCard(player, counter, availablesCards) {
  if(counter > availablesCards.length) {
    return player.sendError(`You can't draw ${counter} when there is only ${availablesCards.length}`)
  }
  const cardsToDraw = availablesCards.splice(0, counter);
  const cards = player.getCards(cardsToDraw)
  player.getSocket().emit("player:draw", {
    action : DRAW_CARD,
    payload : {
      cards,
      socketID: player.getID(),
    }
  })
}