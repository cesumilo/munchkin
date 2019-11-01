import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  ListGroup,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';

import Background from '../img/Backgrounds/cards.png';

import {
  roomSendMessage,
  roomSetMessage,
  roomPlayerIsReady,
  roomPlay,
} from '../redux/actions/room';

import '../css/Room.css';

const PlayerStatus = ({ status }) => (
  <div className={`player-status player-${status ? '' : 'not-'}ready`} />
);

const Room = ({
  selectedRoom,
  players,
  messages,
  sendMessage,
  setMessage,
  currentMessage,
  ready,
  canPlay,
  play
}) => (
  <Container className="full-page">
    <Row id="room-container" className="full-page game-background">
      <Row className="room-upper-part" />
      <Row className="room-info">
        <Col sm={12}>
          <Row className="room-title">
            <Col sm={10}>
              <h2>{selectedRoom}</h2>
            </Col>
            <Col sm={2}>
              <h3>{players.length} / 6</h3>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row
        className="chat-container"
        style={{
          backgroundImage: `url(${Background})`,
        }}
      >
        <Col className="col-sm-9 chat-room">
          <ListGroup id="room-chat" variant="flush">
            {messages.map(msg => (
              <ListGroup.Item className="chat-item">
                {msg.origin}: {msg.message}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col sm={3}>
          <ListGroup id="room-players">
            {players.map(player => (
              <ListGroup.Item>
                <PlayerStatus status={player.isReady} /> {player.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row className="chat-inputs">
        <Col className="col-sm-12 chat-input">
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Votre message..."
              aria-label="Message"
              onChange={value => setMessage(value.target.value)}
              value={currentMessage ? currentMessage : ''}
            />
            <InputGroup.Append>
              <Button variant="primary" onClick={sendMessage}>
                Envoyer
              </Button>
            </InputGroup.Append>
            <InputGroup.Append>
              <Button variant="warning" onClick={ready}>
                Prêt
              </Button>
            </InputGroup.Append>
            <InputGroup.Append>
              <Button variant="success" disabled={!canPlay} onClick={play}>
                Jouer
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
      <Row className="room-bottom-part" />
    </Row>
  </Container>
);

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    selectedRoom: state.play.selectedRoom,
    ...state.room,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sendMessage: () => dispatch(roomSendMessage()),
    setMessage: msg => dispatch(roomSetMessage(msg)),
    ready: () => dispatch(roomPlayerIsReady()),
    play: () => dispatch(roomPlay()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room);
