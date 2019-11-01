import React from 'react';
import { Col, InputGroup, Button, FormControl } from 'react-bootstrap';

export default ({
  currentMessage,
  setMessage,
  sendMessage,
  ready,
  canPlay,
  play,
}) => (
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
);
