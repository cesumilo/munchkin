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

import '../css/Room.css';

const PlayerStatus = status => (
  <div className={`player-status player-${status ? '' : 'not-'}ready`} />
);

const Room = ({ selectedRoom, players }) => (
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
            <ListGroup.Item className="chat-item">
              Alexandre: Cras justo odio
            </ListGroup.Item>
            <ListGroup.Item className="chat-item">
              Guillaume: Dapibus ac facilisis in
            </ListGroup.Item>
            <ListGroup.Item className="chat-item">
              Wilfried: Morbi leo risus
            </ListGroup.Item>
            <ListGroup.Item className="chat-item">
              Zob: Porta ac consectetur ac
            </ListGroup.Item>
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
            />
            <InputGroup.Append>
              <Button variant="primary">Envoyer</Button>
            </InputGroup.Append>
            <InputGroup.Append>
              <Button variant="warning">Prêt</Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
      <Row style={{ height: '20%', width: '100%' }} />
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room);
