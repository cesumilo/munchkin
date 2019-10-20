/**
 * @author Alexandre SAISON <alexandre.saison.pro@gmail.com>
 * @file Card Model
 * @desc Created on 2019-10-20 11:22:15 am
 * @copyright APPI SASU
 */

export class IEffect {
  static apply(parentClassInstance, ...otherClasses) {
    if  (typeof parentClassInstance !== "function")
      throw new Error("classInstance must be a Class")
    const tmpClass = class TmpClass extends parentClassInstance{}
    for (classInstance in otherClasses) {
      for(method of classInstance.prototype) {
        if (!!tmpClass.prototype.method) {
          console.warn(`Warning : ${method} already exists !`)
        }
        tmpClass.prototype.method = method;
      }
    }
  }
}

export default class Card {
  
  constructor(title) {
    this._title = title;
  }
}