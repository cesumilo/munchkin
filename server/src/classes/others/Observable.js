/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Observable Class
 * @desc Created on 2019-10-20 5:51:16 pm
 * @copyright APPI SASU
 */

export default class Observable {
  constructor() {
    this._observers = []
  }

  publish(evtName, payload) {
    if(!this._observers[evtName]) return;
    this._observers[evtName].forEach(subscriberCallback => subscriberCallback(payload))
  }
}