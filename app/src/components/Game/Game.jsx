import React from 'react';
import { Container } from 'react-bootstrap';
import GameBoard from './GameBoard.jsx';
import Hand from './Hand.jsx';

import '../../css/Game.css';

export default ({player}) => (
  <div className="game-container">
    <Container className="game-board">
      <GameBoard player={player}/>
      <Hand />
    </Container>
    <div className="hand-background" />
  </div>
);
