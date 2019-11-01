import React from 'react';
import { Container } from 'react-bootstrap';
import GameBoard from './GameBoard.jsx';
import Hand from './Hand.jsx';

import '../../css/Game.css';

export default () => (
  <div className="game-container">
    <Container className="game-board">
      <GameBoard />
      <Hand />
    </Container>
    <div className="hand-background" />
  </div>
);
