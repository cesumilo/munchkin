/**
 * @author Guillaume Robin and Alexandre Saison <>
 * @file Room reducer
 * @desc Created on 2019-11-01 12:00:15 am
 * @copyright Creative Commons Attribution-NonCommercial 4.0 International License
 */
import { ROOM_UPDATE_INFO } from '../actions/room';

const initialState = {
  player: []
};

export const room = (state = initialState, { type, payload }) => {
  switch (type) {
    case ROOM_UPDATE_INFO:
      return { ...state, players: payload };
    default:
      return state;
  }
};
