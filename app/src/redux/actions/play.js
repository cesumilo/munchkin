/**
 * @author Guillaume Robin and Alexandre Saison <>
 * @file Play component redux actions
 * @desc Created on 2019-10-23 11:25:29 pm
 * @copyright Creative Commons Attribution-NonCommercial 4.0 International License
 */
import axios from 'axios';
import { playerUpdate } from './player';
import { roomUpdateInfo, roomGetMessage, roomUpdateState } from './room';

export const PLAY_INIT = 'PLAY_INIT';

export const PLAY_ON_CHANGE_USERNAME = 'PLAY_ON_CHANGE_USERNAME';
export const PLAY_IS_READY_REQUEST = 'PLAY_IS_READY_REQUEST';
export const PLAY_ON_SELECT_ROOM = 'PLAY_ON_SELECT_ROOM';

export const PLAY_AVAILABLE_ROOM_REQUEST = 'PLAY_AVAILABLE_ROOM_REQUEST';
export const PLAY_AVAILABLE_ROOM_SUCCESS = 'PLAY_AVAILABLE_ROOM_SUCCESS';
export const PLAY_AVAILABLE_ROOM_FAILURE = 'PLAY_AVAILABLE_ROOM_FAILURE';

export const PLAY_ROOM_JOINED = 'PLAY_ROOM_JOINED';

export const playInit = () => ({
  type: PLAY_INIT,
});

export const playAvailableRoomRequest = () => ({
  type: PLAY_AVAILABLE_ROOM_REQUEST,
});

export const playAvailableRoomSuccess = rooms => ({
  type: PLAY_AVAILABLE_ROOM_SUCCESS,
  payload: rooms,
});

export const playAvailableRoomFailure = err => ({
  type: PLAY_AVAILABLE_ROOM_FAILURE,
  error: true,
  payload: err,
});

export const playOnSelectRoom = roomName => ({
  type: PLAY_ON_SELECT_ROOM,
  payload: roomName,
});

export const playOnChangeUsername = username => ({
  type: PLAY_ON_CHANGE_USERNAME,
  payload: username,
});

export const playIsReadyRequest = () => ({
  type: PLAY_IS_READY_REQUEST,
});

export const playRoomJoined = () => ({
  type: PLAY_ROOM_JOINED,
});

/**
 * Fetch available rooms.
 */
export const playFetchAvailableRooms = () => {
  return async dispatch => {
    dispatch(playAvailableRoomRequest());
    try {
      const res = await axios.get('/rooms');
      const { data } = res;
      dispatch(playAvailableRoomSuccess(data));
    } catch (error) {
      // Error 😨
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        dispatch(
          playAvailableRoomFailure(
            `Status: ${error.response.statusCode}: ${error.response.data}`
          )
        );
      } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        dispatch(playAvailableRoomFailure('No response received from server'));
      } else {
        // Something happened in setting up the request and triggered an Error
        dispatch(playAvailableRoomFailure(err.message));
      }
    }
  };
};

export const playIsReady = () => {
  return async (dispatch, getState) => {
    const { socket } = getState().app;
    const { username, selectedRoom } = getState().play;

    dispatch(playIsReadyRequest());

    socket.on('player:update', data => dispatch(playerUpdate(data)));
    socket.on('room:joined', () => dispatch(playRoomJoined()));
    socket.on('room:update', data => dispatch(roomUpdateInfo(data)));
    socket.on('room:message', data => dispatch(roomGetMessage(data)));
    socket.on('room:state', data => dispatch(roomUpdateState(data)));
    socket.emit('room:join', { roomName: selectedRoom, playerName: username });
  };
};
