import '@babel/polyfill';
import React from 'react';
import { connect } from 'react-redux';
import Connecting from './Connecting.jsx';
import Play from './Play.jsx';

import {
  appLoadSocketRequest,
  appLoadSocketSuccess,
  appLoadSocketError,
  appPush,
} from '../redux/actions/app';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/shared.css';

/**
 * #92784d Muesli (Light Brown)
 * #5c4632 Deep Bronze (Brown)
 * #2e2824 Bokara Grey (Black)
 * #9e9e9c Mountain Mist (Grey)
 * #9d4a4e Roof Terracotta (Red)
 */
class App extends React.Component {
  componentDidMount() {
    const { requestSocket, storeSocket, socketError, push } = this.props;

    // Notify connection attempt.
    requestSocket();

    const socket = io();
    socket.on('error', err => socketError(err));
    socket.on('connect_error', err => socketError(err));
    socket.on('connect_timeout', () => socketError('Connection timeout'));
    socket.on('connect', () => {
      storeSocket(socket);
      push(<Play />);
    });
  }

  render() {
    if (!this.props.component) {
      return <Connecting />;
    }
    return this.props.component;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    component: state.app.stack.length > 0 ? state.app.stack[0] : null,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestSocket: () => dispatch(appLoadSocketRequest()),
    storeSocket: socket => dispatch(appLoadSocketSuccess(socket)),
    socketError: err => dispatch(appLoadSocketError(err)),
    push: item => dispatch(appPush(item)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
