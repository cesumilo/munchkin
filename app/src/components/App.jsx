import '@babel/polyfill';
import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Connecting from './Connecting.jsx';
import Play from './Play.jsx';

import {
  appLoadSocketRequest,
  appLoadSocketSuccess,
  appLoadSocketError,
  appPush,
  appErrorModalClose,
  appError,
} from '../redux/actions/app';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/shared.css';

const ErrorHandler = ({ children, errorMessage, close }) => (
  <div className="generic-container">
    {children}
    <Modal size="sm" centered show={errorMessage !== null} onHide={close}>
      <Modal.Body>
        <h4>Oops... 😰</h4>
        <p>{errorMessage}</p>
      </Modal.Body>
    </Modal>
  </div>
);

/**
 * #92784d Muesli (Light Brown)
 * #5c4632 Deep Bronze (Brown)
 * #2e2824 Bokara Grey (Black)
 * #9e9e9c Mountain Mist (Grey)
 * #9d4a4e Roof Terracotta (Red)
 */
class App extends React.Component {
  componentDidMount() {
    const {
      requestSocket,
      storeSocket,
      socketError,
      push,
      logError,
    } = this.props;

    // Notify connection attempt.
    requestSocket();

    const socket = io();
    socket.on('error', err => socketError(err));
    socket.on('connect_error', err => socketError(err));
    socket.on('connect_timeout', () => socketError('Connection timeout'));
    socket.on('socket:error', err => logError(err));
    socket.on('connect', () => {
      storeSocket(socket);
      push(<Play />);
    });
  }

  render() {
    if (!this.props.component) {
      return (
        <ErrorHandler
          close={this.props.closeModal}
          errorMessage={this.props.errorMessage}
        >
          <Connecting />
        </ErrorHandler>
      );
    }
    return (
      <ErrorHandler
        close={this.props.closeModal}
        errorMessage={this.props.errorMessage}
      >
        {this.props.component}
      </ErrorHandler>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    component: state.app.stack.length > 0 ? state.app.stack[0] : null,
    errorMessage: state.app.errorMessage,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestSocket: () => dispatch(appLoadSocketRequest()),
    storeSocket: socket => dispatch(appLoadSocketSuccess(socket)),
    socketError: err => dispatch(appLoadSocketError(err)),
    push: item => dispatch(appPush(item)),
    closeModal: () => dispatch(appErrorModalClose()),
    logError: err => dispatch(appError(err)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
