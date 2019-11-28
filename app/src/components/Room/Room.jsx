import React from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import RoomTitle from './RoomTitle.jsx';
import RoomChat from './RoomChat.jsx';
import RoomPlayers from './RoomPlayers.jsx';
import RoomInputs from './RoomInputs.jsx';
import Game from '../Game/Game.jsx';

import Background from '../../img/Backgrounds/cards.png';

import {
  roomSendMessage,
  roomSetMessage,
  roomPlayerIsReady,
  roomPlay,
  roomInit,
} from '../../redux/actions/room';
import { appPush } from '../../redux/actions/app';

import '../../css/Room.css';

class Room extends React.Component {
  componentDidMount() {
    this.props.init();
  }
  componentDidUpdate() {
    if (this.props.gameStarted) {
      this.props.push(<Game />);
    }
  }

  render() {
    const {
      selectedRoom,
      players,
      messages,
      sendMessage,
      setMessage,
      currentMessage,
      ready,
      canPlay,
      play,
    } = this.props;
    return (
      <Container className="full-page">
        <Row id="room-container" className="full-page game-background">
          <Row className="room-upper-part" />
          <Row className="room-info">
            <RoomTitle selectedRoom={selectedRoom} nbPlayers={players.length} />
          </Row>
          <Row
            className="chat-container"
            style={{ backgroundImage: `url(${Background})` }}
          >
            <RoomChat messages={messages} />
            <RoomPlayers players={players} />
          </Row>
          <Row className="chat-inputs">
            <RoomInputs
              currentMessage={currentMessage}
              setMessage={setMessage}
              sendMessage={sendMessage}
              canPlay={canPlay}
              ready={ready}
              play={play}
            />
          </Row>
          <Row className="room-bottom-part" />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    selectedRoom: state.play.selectedRoom,
    ...state.room,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    init: () => dispatch(roomInit()),
    sendMessage: () => dispatch(roomSendMessage()),
    setMessage: msg => dispatch(roomSetMessage(msg)),
    ready: () => dispatch(roomPlayerIsReady()),
    play: () => dispatch(roomPlay()),
    push: data => dispatch(appPush(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room);
