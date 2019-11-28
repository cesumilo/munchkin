/**
 * @author Guillaume Robin and Alexandre Saison <>
 * @file Room redux actions
 * @desc Created on 2019-11-01 12:02:55 am
 * @copyright Creative Commons Attribution-NonCommercial 4.0 International License
 */
export const ROOM_INIT = 'ROOM_INIT';
export const ROOM_UPDATE_INFO = 'ROOM_UPDATE_INFO';
export const ROOM_GET_MESSAGE = 'ROOM_GET_MESSAGE';
export const ROOM_SEND_MESSAGE = 'ROOM_SEND_MESSAGE';
export const ROOM_SET_MESSAGE = 'ROOM_SET_MESSAGE';
export const ROOM_UPDATE_STATE = 'ROOM_UPDATE_STATE';
export const ROOM_START_GAME = 'ROOM_START_GAME';

export const roomInit = () => ({
  type: ROOM_INIT,
});

export const roomStartGame = () => ({
  type: ROOM_START_GAME,
});

export const roomUpdateInfo = data => ({
  type: ROOM_UPDATE_INFO,
  payload: data,
});

export const roomGetMessage = data => ({
  type: ROOM_GET_MESSAGE,
  payload: data,
});

export const roomSetMessage = data => ({
  type: ROOM_SET_MESSAGE,
  payload: data,
});

export const roomSendMessageRequest = () => ({ type: ROOM_SEND_MESSAGE });

export const roomUpdateState = msg => ({
  type: ROOM_UPDATE_STATE,
  payload: msg === 'READY',
});

export const roomSendMessage = () => {
  return async (dispatch, getState) => {
    const { socket } = getState().app;
    const { username, selectedRoom } = getState().play;
    const { currentMessage } = getState().room;
    socket.emit('player:message', {
      roomName: selectedRoom,
      name: username,
      message: currentMessage,
    });
    dispatch(roomSendMessageRequest());
  };
};

export const roomPlayerIsReady = () => {
  return async (_, getState) => {
    const { socket } = getState().app;
    socket.emit('player:action', {
      action: 'READY',
    });
  };
};

export const roomPlay = () => {
  return async (_, getState) => {
    const { socket } = getState().app;
    const { selectedRoom } = getState().play;
    socket.emit('game:start', { roomName: selectedRoom });
  };
};
