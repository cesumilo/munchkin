import React from 'react';
import {
  Container,
  Row,
  Col,
  ListGroup,
  Badge,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';

import Background from '../img/Backgrounds/cards.png';

import '../css/Room.css';

const Ready = () => <div className="player-status player-ready" />;
const NotReady = () => <div className="player-status player-not-ready" />;

export default () => (
  <Container className="full-page">
    <Row
      className="full-page game-background"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Row style={{ height: '20%', width: '100%' }} />
      <Row style={{ height: '10%', width: '100%' }}>
        <Col sm={12}>
          <Row style={{ width: '100%', height: '100%', color: 'white' }}>
            <Col sm={10}>
              <h2>Room-1</h2>
            </Col>
            <Col sm={2}>
              <h3>1 / 6</h3>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row
        style={{
          height: '40%',
          width: '100%',
          backgroundImage: `url(${Background})`,
          backgroundSize: 'cover',
          paddingTop: '25px',
          paddingBottom: '25px'
        }}
      >
        <Col
          sm={9}
          style={{
            overflow: 'hidden',
            borderRight: '1px solid rgba(0,0,0,.125)'
          }}
        >
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
            <ListGroup.Item>
              <Ready /> Guillaume
            </ListGroup.Item>
            <ListGroup.Item>
              <NotReady /> Alexandre
            </ListGroup.Item>
            <ListGroup.Item>
              <NotReady /> Wilfried
            </ListGroup.Item>
            <ListGroup.Item>
              <NotReady /> Zob
            </ListGroup.Item>
            <ListGroup.Item>
              <NotReady /> Zob 2
            </ListGroup.Item>
            <ListGroup.Item>
              <NotReady /> Zob 3
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row style={{ height: '10%', width: '100%' }}>
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
