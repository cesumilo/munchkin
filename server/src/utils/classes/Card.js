/**
 * @author Alexandre SAISON <alexandre.saison.pro@gmail.com>
 * @file Card Model
 * @desc Created on 2019-10-20 11:22:15 am
 * @copyright APPI SASU
 */

export default class Card {
  constructor(title, type) {
    this._type = type;
    this._title = title;
  }

  applyEffect() {}
  play(player) {}
  getID() {
    return `${this._type}:${this._title}`;
  }

  toString() {
    return {
      name : this._title,
      description : "",
      strength : 12,
      type : this._type,
      imgURL : ["POSSIBLE:IMG:URL"]
    }
  }
  /**
   *
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
}
