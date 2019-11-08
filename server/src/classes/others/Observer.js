import Observable from "./Observable";

/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 5:51:26 pm
 * @copyright APPI SASU
 */

export default class Observer {

  subscribe(observable, evtName, callback) {
    if (observable instanceof Observable) {
      if (!observable._observers[evtName]) {
        observable._observers[evtName] = [];
      }
      observable._observers[evtName].push(callback)
    } else throw new Error(`You must only subscribe to an Observable instance type`);
  }
}