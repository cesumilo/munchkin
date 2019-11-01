/**
 * @author Guillaume Robin and Alexandre Saison <>
 * @file Room reducer
 * @desc Created on 2019-11-01 12:00:15 am
 * @copyright Creative Commons Attribution-NonCommercial 4.0 International License
 */
import {
  ROOM_UPDATE_INFO,
  ROOM_GET_MESSAGE,
  ROOM_SET_MESSAGE,
  ROOM_SEND_MESSAGE,
  ROOM_UPDATE_STATE,
  ROOM_INIT,
  ROOM_START_GAME,
} from '../actions/room';

const initialState = {
  players: [],
  messages: [],
  currentMessage: null,
  canPlay: false,
  gameStarted: false,
};

export const room = (state = initialState, { type, payload }) => {
  switch (type) {
    case ROOM_INIT:
      return initialState;
    case ROOM_START_GAME:
      return { ...state, gameStarted: true };
    case ROOM_UPDATE_INFO:
      return { ...state, players: payload.players };
    case ROOM_GET_MESSAGE:
      return { ...state, messages: [payload, ...state.messages] };
    case ROOM_SEND_MESSAGE:
      return { ...state, currentMessage: null };
    case ROOM_SET_MESSAGE:
      return { ...state, currentMessage: payload };
    case ROOM_UPDATE_STATE:
      return { ...state, canPlay: payload };
    default:
      return state;
  }
};
