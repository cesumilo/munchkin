/**
 * @author Alexandre SAISON <alexandre.saison.pro@gmail.com>
 * @file Player class for Munchkin
 * @desc Created on 2019-10-19 6:47:37 pm
 * @copyright APPI SASU
 */

import Card from './Card'
import { READY, START_GAME } from '../actions/Player';

export default class Player {

  constructor(name, socket) {
    this._socket = socket;
    this._name = name;
    this._lvl = 1;
    this._strength = 0;
    this._equipments = []
    this._cards = []
    this._race = "Humain"
    this._class = "None"
    this._ready = false;
    this.waitForEvents()
  }

  waitForEvents() {
    this._socket.on("player:action", this.handleEvent.bind(this));
  }

  handleEvent(event) {
    console.log('Received action => ', event);
    switch (event.action) {
      case READY:
        this.updateReadiness();
      case START_GAME:
        this.startGame();
      default:
    }
  }

  startGame() {
    this._socket.emit();
  }

  updateReadiness() {
    this._ready = !this._ready;
    this._socket.emit("room:message", `You are ${this._ready ? '' : 'not'} ready`);
  }

  getStrength() {
    return this._lvl + this._equipments.reduce((a, c) => a + c.getValue(), 0)
  }

  getCard(card) {
    if (!(card instanceof Card))
      throw new Error('card parameter must be a Card object');
    if (card.hasEffect())
      card.applyEffect(this)
    this._cards.push(card)
  }

  canFinishLap() {
    const cardsLength = this._cards.length;
    return this._race === "Nain" ? cardsLength <= 6 : cardsLength <= 5;
  }

  updateLevel(amount) {
    if (this._lvl + amount < 1) {
      this._lvl = 1;
      throw new Error(`Level of ${this._name} can't be under 1`);
    } else if (this._lvl + amount >= 10) {
      throw `${this._name} has won the Game`;
    } else {
      this._lvl += amount;
    }
  }

  getID() {
    return this._socket.id;
  }



  giveCard(card) {
    // TODO : Handle this when socket.io
  }
}