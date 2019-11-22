/**
 * @author Alexandre SAISON <alexandre.saison.pro@gmail.com>
 * @file Card Model
 * @desc Created on 2019-10-20 11:22:15 am
 * @copyright APPI SASU
 */

import Player from "./Player";

export default class Card {
  constructor(title, type) {
    this._type = type;
    this._title = title;
    this._images = []
  }

  /**
   * Set/Update Image URL for the Cards to display
   * @param {Array<string>} urls urls of all possible images for this Card
   */
  updateImageLocation(urls) {
    this._images.push(urls)
  }

  /**
   * 
   * @param {string\|Class} typeName the type of the cards to check
   */
  isA(typeName) {
    return this._type === typeName;
  }

  /**
   * Triggers when a Player play a card
   * @param {Player} player player that play the card
   * @param {boolean} firstStage if has to be apply now
   */
  play(player, firstStage) {
    console.log("[CARD] #play");
  }

  /**
   * @returns {string} returns the TYPE:TITLE of the card
   */
  getID() {
    return `${this._type}:${this._title}`;
  }

  /**
   * Get a card using its ID (TYPE:TITLE)
   * @param {Array<Card>} hand
   * @param {string} cardID
   */
  static getCard(hand, cardID) {
    const potentialCard = hand.find(c => c.getID() === cardID);
    if (!potentialCard) {
      throw new Error("Card " + cardID + " hasn't been found");
    }
    return potentialCard;
  }

  getName() {
    return this._title;
  }
}
