/**
 * @author Guillaume Robin and Alexandre Saison <>
 * @file Play component reducer
 * @desc Created on 2019-10-23 11:26:16 pm
 * @copyright Creative Commons Attribution-NonCommercial 4.0 International License
 */
import {
  PLAY_ON_CHANGE_USERNAME,
  PLAY_IS_READY_REQUEST,
  PLAY_ON_SELECT_ROOM,
  PLAY_AVAILABLE_ROOM_FAILURE,
  PLAY_AVAILABLE_ROOM_REQUEST,
  PLAY_AVAILABLE_ROOM_SUCCESS,
  PLAY_ROOM_JOINED,
  PLAY_INIT,
} from '../actions/play';

const initialState = {
  loading: false,
  username: null,
  selectedRoom: '',
  rooms: [],
  error: null,
  fetchingRooms: false,
  roomJoined: false,
};

export const play = (state = initialState, { type, payload }) => {
  switch (type) {
    case PLAY_INIT:
      return initialState;
    case PLAY_ROOM_JOINED:
      return { ...state, roomJoined: true };
    case PLAY_IS_READY_REQUEST:
      return { ...state, loading: true };
    case PLAY_ON_CHANGE_USERNAME:
      return { ...state, username: payload };
    case PLAY_ON_SELECT_ROOM:
      return { ...state, selectedRoom: payload };
    case PLAY_AVAILABLE_ROOM_REQUEST:
      return { ...state, fetchingRooms: true, rooms: [], error: null };
    case PLAY_AVAILABLE_ROOM_SUCCESS:
      return { ...state, fetchingRooms: false, rooms: payload, error: null };
    case PLAY_AVAILABLE_ROOM_FAILURE:
      return { ...state, fetchingRooms: false, rooms: [], error: payload };
    default:
      return state;
  }
};
