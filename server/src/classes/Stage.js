/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-25 11:17:43 pm
 * @copyright APPI SASU
 */

import Player from "./Player";
import { NEXT_STAGE } from '../utils/actions/Stage';

export const SECOND = 1000;
export const MINUTE = 60 * SECOND;

export default class Stage {

  /**
   * @param {Player} player represents the player
   * @param {string} name represents the stage's name
   * @param {Stage} nextStage instance of next stage to process (last stage got nextStage => null) 
   * @param {number} ttl Time to Live of the stage before process the other stage
   */
  constructor(player, name, nextStage, handler, ttl = 2 * MINUTE) {
    this._player = player;
    this._name = name;
    this._next = nextStage;
    this._handler = handler;
    this._reward = null;
    this._ttl = ttl;
    this._isFinished = false;
    this.notifiyPlayer("stage:start", {
      ttl: this._ttl,
      name: this._name
    })
  }

  startStage() {
    if (!!this._handler && typeof this._handler === "function") {
      console.log(`[STAGE] ${this._name} Stage has been started for ${this._player.getName()} !`)
      this.handleTTL();
      return this._handler()
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

  endStage() {
    this.notifiyPlayer("stage:end", {
      name: this._name,
      next: this._next && this._next._name,
      nextTTL: this._next && this._next._ttl
    })
    this._isFinished = true;
    return this._next && this._next.startStage();
  }

  /**
   * Handle Stage Loop
   */
  handleTTL() {
    setTimeout(() => {
      console.log("[STAGE] handleTTL => ", this);
      if (!this._next) this._player.publish("player:endturn", this._player.getID())
      else if (!this._next instanceof Stage)
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

  processNext(stage) {
    if (!stage || !(stage instanceof Stage)) {
      throw new Error("Stage must exists and be instance of Stage");
    }
    console.log("[STAGE] enter processNextStage")
    const playerSocket = this._player.getSocket();
    this._player.setCurrentStage(stage);
    playerSocket.emit("player:stage", {
      action: NEXT_STAGE,
      payload: {
        socketID: playerSocket.id
      }
    })
  }
}