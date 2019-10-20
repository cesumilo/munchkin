import React from 'react';
import { Row, Container } from 'react-bootstrap';
import Card from './Card.jsx';

import Background from '../img/Backgrounds/cards.png';

import '../css/Hand.css';

const cardNumber = 12;
const sm = Math.floor(12 / cardNumber);
const cards = [];

for (let i = 0; i < cardNumber; i += 1) {
  cards.push(<Card sm={sm} />);
}

const Hand = () => (
  <Row className="hand" style={{ backgroundImage: `url(${Background})` }}>
    {cards}
  </Row>
);

export default Hand;
