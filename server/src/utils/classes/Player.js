/**
 * @author Alexandre SAISON <alexandre.saison.pro@gmail.com>
 * @file Player class for Munchkin
 * @desc Created on 2019-10-19 6:47:37 pm
 * @copyright APPI SASU
 */

import Card from "./Card";
import { READY, UNREADY, PLAY_CARD, GIVE_CARD } from "../actions/Player";
import Observable from "./others/Observable";

export default class Player extends Observable {
  constructor(name, socket, room) {
    super();
    this._room = room;
    this._socket = socket;
    this._name = name;
    this._lvl = 1;
    this._strength = 0;
    this._equipments = [];
    this._cards = [];
    this._race = "Humain";
    this._class = "None";
    this._ready = false;
    this.waitForEvents();
  }

  waitForEvents() {
    this._socket.on("player:action", this.handleEvent.bind(this));
  }

  handleEvent(event) {
    console.log("Received action => ", event);
    switch (event.action) {
      case READY:
        this.updateReadiness(true);
        this.publish("player:ready", null);
        break;
      case UNREADY:
        this.updateReadiness(false);
        this.publish("player:unready", null);
        break;
      case PLAY_CARD:
        this.break;
      case FINISH_TURN:
        if (this.canFinishLap()) {
          // TODO : Handle update Stage
        }
        break;
      default:
    }
  }

  isReady() {
    return this._ready;
  }

  updateReadiness(ready) {
    this._ready = ready;
    this._socket.emit(
      "room:message",
      `You are ${this._ready ? "" : "not"} ready`
    );
  }

  getStrength() {
    return this._lvl + this._equipments.reduce((a, c) => a + c.getValue(), 0);
  }

  getCard(card) {
    if (!(card instanceof Card))
      throw new Error("card parameter must be a Card object");
    if (card.hasEffect()) card.applyEffect(this);
    this._cards.push(card);
  }

  useCard(card, player = this) {
    card.use(player);
    this._socket.emit("player:useCard", {
      level: this._lvl,
      equipments: this._equipments,
      strength: this.getStrength(),
      race: this._race,
      className: this._class,
      cards: this._cards.map(c => c.constructor.name())
    });
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

  getName() {
    return this._name;
  }

  giveCard(card) {
    // TODO : Handle this when socket.io
  }
}
