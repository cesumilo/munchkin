/**
 * @author Guillaume Robin and Alexandre Saison <>
 * @file Player redux reducer
 * @desc Created on 2019-10-24 12:02:35 am
 * @copyright Creative Commons Attribution-NonCommercial 4.0 International License
 */
import { PLAYER_UPDATE } from '../actions/player';

const initialState = {
  name: null,
  socketID: null,
  class: null,
  race: null,
  ready: null,
  cards: [],
  lvl: null,
  strength: null,
};

export const player = (state = initialState, { type, payload }) => {
  switch (type) {
    case PLAYER_UPDATE:
      return { ...state, ...payload };
    default:
      return state;
  }
};
