/**
 * @author Guillaume Robin and Alexandre Saison <>
 * @file App component reducer
 * @desc Created on 2019-10-23 10:05:48 pm
 * @copyright Creative Commons Attribution-NonCommercial 4.0 International License
 */
import {
  APP_LOAD_SOCKET_ERROR,
  APP_LOAD_SOCKET_REQUEST,
  APP_LOAD_SOCKET_SUCCESS,
  APP_POP,
  APP_PUSH,
  APP_ERROR_MODAL_CLOSE,
  APP_ERROR,
} from '../actions/app';

const initialState = {
  connecting: false,
  errorMessage: null,
  socket: null,
  stack: [],
};

export const app = (state = initialState, { type, payload }) => {
  switch (type) {
    case APP_ERROR_MODAL_CLOSE:
      return { ...state, errorMessage: null };
    case APP_PUSH:
      return { ...state, stack: [payload].concat(state.stack) };
    case APP_POP:
      return {
        ...state,
        stack: state.stack.slice(1),
      };
    case APP_LOAD_SOCKET_REQUEST:
      return { ...state, connecting: true, errorMessage: null };
    case APP_LOAD_SOCKET_SUCCESS:
      return {
        ...state,
        connecting: false,
        socket: payload,
        errorMessage: null,
      };
    case APP_LOAD_SOCKET_ERROR:
      return {
        ...state,
        connecting: false,
        socket: null,
        errorMessage: payload,
      };
    case APP_ERROR:
      return {
        ...state,
        errorMessage: payload,
      };
    default:
      return state;
  }
};
