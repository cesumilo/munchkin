/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-25 11:17:43 pm
 * @copyright APPI SASU
 */

import Player from "./Player";
import { NEXT_STAGE, WAITING, PREPARATION } from '../actions/Stage';

const SECOND = 1000;
const MINUTE = 60 * SECOND;

function defaultHandler(socket) {
  console.log("[STAGE] enter in default Handler");
  socket.emit("player:stage", {
    action: WAITING,
    payload : {
      socketID: this._player.getSocket().id
    }
  })
}

export default class Stage {

  /**
   * @param {Player} player represents the player
   * @param {string} name represents the stage's name
   * @param {Stage} nextStage instance of next stage to process (last stage got nextStage => null) 
   * @param {number} ttl Time to Live of the stage before process the other stage
   */
  constructor(player, name, nextStage, ttl = 2 * MINUTE) {
    this._player = player;
    this._name = name;
    this._next = nextStage;
    this._ttl = ttl;
  }

  static createFirstStage(player) {
    const primaryStage = new Stage(player, PREPARATION, null)
  }

  /**
   * Handle Stage Loop
   * @param {function} handler
   */
  handleStage(handler = defaultHandler) {
    if (typeof handler !== "function")
      throw new Error("handler must be a function");
    handler.call(this);
    setTimeout(() => {
      if (!this._next instanceof Stage)
        throw new Error(`The next Stage must be an instance of Stage`)
      if (!!this._next) return this.processNext(this._next);
      console.log("[STAGE] Last stage has been triggered")
    }, this._ttl);
  }

  processNext(stage) {
    if (!stage || !(stage instanceof Stage)) {
      throw new Error("Stage must exists and be instance of Stage");
    }
    const playerSocket = this._player.getSocket();
    playerSocket.emit("player:stage", {
      action: NEXT_STAGE,
      payload: {
        socketID: playerSocket.id
      }
    })
  }
}