import React from 'react';
import { Row } from 'react-bootstrap';

import DungeonSrc from '../img/dungeon.png';
import TreasureSrc from '../img/treasure.jpg';

// mdr
import '../css/Decks.css';

const Decks = () => (
  <Row className="decks-container">
    <div className="decks-col">
      <img className="deck" src={DungeonSrc} alt="Dungeon deck" />
      <img className="deck" src={TreasureSrc} alt="Treasure deck" />
    </div>
  </Row>
);

export default Decks;
