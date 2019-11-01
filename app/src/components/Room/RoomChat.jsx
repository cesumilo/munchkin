import React from 'react';
import { Col, ListGroup } from 'react-bootstrap';

export default ({ messages }) => (
  <Col className="col-sm-9 chat-room">
    <ListGroup id="room-chat" variant="flush">
      {messages.map(msg => (
        <ListGroup.Item className="chat-item">
          {msg.origin}: {msg.message}
        </ListGroup.Item>
      ))}
    </ListGroup>
  </Col>
);
