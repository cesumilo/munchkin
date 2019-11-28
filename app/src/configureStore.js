/**
 * @author Guillaume Robin <>
 * @file Redux store configuration
 * @desc Created on 2019-10-15 11:25:29 pm
 * @copyright GPL-3.0
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/reducers';

export default () => createStore(rootReducer, applyMiddleware(thunk));
