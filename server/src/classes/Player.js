/**
 * @author Alexandre SAISON <alexandre.saison.pro@gmail.com>
 * @file Player class for Munchkin
 * @desc Created on 2019-10-19 6:47:37 pm
 * @copyright APPI SASU
 */

import Card from "./Card";
import { READY, PLAY_CARD, DRAW_CARD } from "../utils/actions/Player";
import Observable from "./others/Observable";
import Room from "./Room";
import Stage from "./Stage";
import { END_TURN } from "../utils/actions/Stage";
import Monster from "./donjons_cards/Monster";
import Equipment from "./treasure_cards/Equipment";

export default class Player extends Observable {
  /**
   *
   * @param {string} name
   * @param {SocketIO.Socket} socket
   */
  constructor(name, socket) {
    super();
    this._socket = socket;
    this._name = name;
    this._lvl = 1;
    this._strength = 0;
    this._equipments = [];
    this._cards = [];
    this._race = "Humain";
    this._class = "None";
    this._speed = 0;
    this._currentStage = null;
    this._ready = false;
    this.waitForEvents();
  }

  getLevel() {
    return this._lvl;
  }

  /**
   * This method can be called on Handler
   * @param {string} race the new race of the Player
   */
  setRace(race) {
    this._race = race;
  }

  /**
   * This method can be called on Handler
   * @param {string} classe the new  class of the Player
   */
  setClass(classe) {
    this._cards = classe
  }

  /**
   * Get the supposed player using his socketID
   * @param {Room} room the supposed Room where to find the player
   * @param {string} socketID defined the socketID of the player to find
   */
  static getPlayerWithSocketID(room, socketID) {
    return room.getPlayers().find(player => player.getID() === socketID)
  }

  /**
   * @returns {Stage} returns the current stage where the player is involved or null
   */
  getCurrentStage() {
    return this._currentStage;
  }

  /**
   * Send envent to the Event Queue, will be processed by the room
   */
  triggerNextStage(stage = null) {
    this.publish("stage:next", stage);
  }

  /**
   * Set and apply the new stage
   * @param {Stage} stage 
   */
  setCurrentStage(stage) {
    this._currentStage = stage;
  }

  getSocket() {
    return this._socket;
  }

  waitForEvents() {
    this.getSocket().on("player:action", this.handleEvent.bind(this));
  }

  /**
   * @param {string} event.action ACTION to triggger
   * @param {object} event.payload payload to give to server
   */
  handleEvent(event) {
    switch (event.action) {
      case READY:
        this.updateReadiness(true);
        this.publish("player:ready", this.getID());
        this.sendAttributes();
        break;
      case DRAW_CARD:
        throw new Error("EVENT ACTION:DRAW_CARD : NOT_IMPLEMENTED_YET");
      case PLAY_CARD:
        throw new Error("EVENT ACTION:PLAYER_CARD : NOT_IMPLEMENTED_YET");
      default:
        throw new Error("EVENT DEFAULT : event got unknown action");
    }
  }

  sendAttributes() {
    this.getSocket().emit("player:update", this.getAttributes());
  }

  /**
   * This method allow to send error to the related client
   * @param {string} errorMessage the Error message string to send to the client
   */
  sendError(errorMessage) {
    this.getSocket().emit("socket:error", errorMessage);
  }

  /**
   * @return {{name: string, sockerID: string, class: string, ready: boolean, cards: Array<Card>, lvl: string}}
   */
  getAttributes() {
    return {
      name: this.getName(),
      socketID: this.getID(),
      class: this._class,
      race: this._race,
      ready: this._ready,
      cards: this._cards,
      lvl: this._lvl,
      strength: this.getStrength()
    }
  }

  isReady() {
    return this._ready;
  }

  updateReadiness(ready) {
    this._ready = ready;
  }

  getStrength() {
    return this._lvl + this._equipments.reduce((a, c) => a + c.getValue(), 0);
  }

  /**
   * @param {Equipment} equipment the equipment to add to the player
   */
  addEquiment(equipment) {
    this._equipments.push(equipment)
  }

  /**
   * Draw card function
   * @param {Array<Card>} cards 
   */
  getCards(cards = []) {
    this._cards.push(...cards)
    this.getSocket().emit("player:drawCard", cards)
    return this._cards;
  }

  canFinishLap() {
    const cardsLength = this._cards.length;
    const isStageOK = !!this._currentStage && this._currentStage._name === END_TURN;
    const isHandOK = this._race === "Nain" ? cardsLength <= 6 : cardsLength <= 5;
    return isStageOK && isHandOK;
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
    return this.getSocket() && this.getSocket().id;
  }

  getName() {
    return this._name;
  }

  /**
   * Checks function to know if the player beat the monster
   * @param {Monster} monstrer the monster to check if player can beat him
   */
  beat(monstrer) {
    return this.getStrength() > monstrer.getStrength()
  }
}
