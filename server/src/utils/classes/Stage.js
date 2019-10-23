import Player from "./Player";

const SECOND = 1000;
const MINUTE = 60 * SECOND;

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

  /**
   * Handle Stage Loop
   */
  handleStage() {
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
      type: "NEXT_STAGE",
      payload: {
        socketID: playerSocket.id
      }
    })
  }
}