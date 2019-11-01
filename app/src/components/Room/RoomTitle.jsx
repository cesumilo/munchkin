import React from 'react';
import { Col, Row } from 'react-bootstrap';

export default ({ selectedRoom, nbPlayers }) => (
  <Col sm={12}>
    <Row className="room-title">
      <Col sm={10}>
        <h2>{selectedRoom}</h2>
      </Col>
      <Col sm={2}>
        <h3>{nbPlayers} / 6</h3>
      </Col>
    </Row>
  </Col>
);
