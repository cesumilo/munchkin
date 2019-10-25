/**
 * @author Alexandre SAISON <alexandre.saison.pro@gmail.com>
 * @file Player class for Munchkin
 * @desc Created on 2019-10-19 6:47:37 pm
 * @copyright APPI SASU
 */

import Card from "./Card";
import { READY, PLAY_CARD } from "../actions/Player";
import Observable from "./others/Observable";
import Room from "./Room";
import Stage from "./Stage";

export default class Player extends Observable {
  /**
   *
   * @param {string} name
   * @param {SocketIO.Socket} socket
   * @param {Room} room
   */
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
    this._currentStage = null;
    this._ready = false;
    this.waitForEvents();
  }

  /**
   * @returns {Stage} returns the current stage where the player is involved or null
   */
  getCurrentStage() {
    return this._currentStage;
  }

  triggerNextStage() {
    this.publish("stage:next", null);
  }

  setCurrentStage(stage) {
    this._currentStage = stage;
  }

  getSocket() {
    return this._socket;
  }

  waitForEvents() {
    this._socket.on("player:action", this.handleEvent.bind(this));
  }

  /**
   * @param {string} event.action ACTION to triggger
   * @param {object} event.payload payload to give to server
   */
  handleEvent(event) {
    console.log("Received action => ", event);
    switch (event.action) {
      case READY:
        this.updateReadiness(true);
        this.publish("player:ready", null);
        if (!!event.payload && !!event.payload.username) {
          this._name = event.payload.username;
          this.sendAttributes();
        } else {
          this.sendError("You must provide a username to tell you're ready !")
        }
        break;
      case PLAY_CARD:
        break;
      case FINISH_TURN:
        if (this.canFinishLap()) {
          // TODO : Handle update Stage
        }
        break;
      default:
    }
  }

  sendAttributes() {
    this.getSocket().emit("player:update", this.getAttributes());
  }

  sendError(errorMessage) {
    this.getSocket().emit("socket:error", errorMessage);
  }

  getAttributes() {
    return {
      name: this.getName(),
      socketID: this.getID(),
      class: this._class,
      race: this._race,
      ready: this._ready,
      cards: this._cards,
      lvl: this._lvl,
<<<<<<< HEAD
      strength: this.strength
    };
=======
      strength: this._strength
    }
>>>>>>> 5b64865af1f54934f844c998631d657407322930
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

  /**
   * 
   * @param {Array<Card>} cards 
   */
  getCards(cards = []) {
    cards.forEach(c => c.hasEffect() && c.applyEffect(this))
    this._cards.push(cards);
    return this._cards;
  }

  useCard(card, player = this) {
    card.use(player);
    this.getSocket().emit("player:useCard", {
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
