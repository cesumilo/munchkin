import React from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import PlayerStatus from './PlayerStatus.jsx';

export default ({ players }) => (
  <Col sm={3}>
    <ListGroup id="room-players">
      {players.map(player => (
        <ListGroup.Item>
          <PlayerStatus status={player.isReady} /> {player.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  </Col>
);
