import React from 'react';
import { Container } from 'react-bootstrap';
import Hand from './Hand.jsx';
import GameBoard from './GameBoard.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';

/**
 * #92784d Muesli (Light Brown)
 * #5c4632 Deep Bronze (Brown)
 * #2e2824 Bokara Grey (Black)
 * #9e9e9c Mountain Mist (Grey)
 * #9d4a4e Roof Terracotta (Red)
 */
const App = () => (
  <div className="game-container">
    <Container className="game-board">
      <GameBoard />
      <Hand />
    </Container>
    <div className="hand-background" />
  </div>
);

export default App;
