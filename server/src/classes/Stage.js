/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-25 11:17:43 pm
 * @copyright APPI SASU
 */

import Player from "./Player";
import { NEXT_STAGE } from '../utils/actions/Stage';
import Observable from "./others/Observable";

export const SECOND = 1000;
export const MINUTE = 60 * SECOND;

export default class Stage extends Observable {

  /**
   * @param {Player} player represents the player
   * @param {string} name represents the stage's name
   * @param {(player) => Stage} nextStage instance of next stage to process (last stage got nextStage => null) 
   * @param {number} ttl Time to Live of the stage before process the other stage
   */
  constructor(player, name, nextStage, handler, ttl = 2 * MINUTE) {
    super();
    this._player = player;
    this._name = name;
    this._next = nextStage;
    this._handler = handler;
    this._reward = null;
    this._ttl = ttl;
    this._isFinished = false;
  }

  startStage() {
    if (!!this._handler && typeof this._handler === "function") {
      console.log(`[STAGE] ${this._name} Stage has been started for ${this._player.getName()} !`)
      this.notifiyPlayer("stage:start", {
        ttl: this.getTTL(),
        name: this.getName()
      })
      this._handler.call(this, this._player);
      this.handleTTL()
    }
    else throw new Error("Handler must be a function");
  }

  /**
   * send event to 
   * @param {string} evtName 
   * @param {object} payload 
   */
  notifiyPlayer(evtName, payload) {
    this._player.getSocket().emit(evtName, payload)
  }

  getNext() {
    if (this._next instanceof Function) {
      return this._next.call(this, this._player);
    }
    return this._next;
  }

  getName() {
    return this._name;
  }

  endStage() {
    this._isFinished = true;
    if (!!this.getNext()) {
      this.notifiyPlayer("stage:end", {
        name: this.getName(),
        next: this.getNext().getName(),
        nextTTL: this.getNext().getTTL()
      });
      console.log("[LOG] #endStage::next =>", this.getNext().getName());
      this._player.sendAttributes()
      return this.processNext(this.getNext());
    } else {
      this._player.sendAttributes()
      this._player.publish("player:endturn", this._player.getID());
    }
  }

  /**
   * Handle Stage Loop
   */
  handleTTL() {
    setTimeout(() => {
      if (!this.getNext()) {
        this._player.sendAttributes()
        this._player.publish("player:endturn", this._player.getID());
        this.endStage()
      }
      else if (!this.getNext() instanceof Stage)
        throw new Error(`The next Stage must be an instance of Stage`)
      else return this.endStage();
      console.log("[STAGE] Last stage has been triggered")
    }, this.getTTL());
  }

  /**
   * @returns {number} returns the Time To Live of the Stage
   */
  getTTL() {
    return this._ttl;
  }

  /**
   * 
   * @param {any} stage function that returns stage or stage
   */
  processNext(stage) {
    if (!!stage && stage instanceof Function) {
      stage = stage.call(this, this._player);
    }
    if (!stage || (!!stage && !(stage instanceof Stage))) {
      throw new Error("Stage must exists and be a Stage or a function that handle stage");
    }
    this._player.setCurrentStage(stage);
    stage.startStage()
  }
}