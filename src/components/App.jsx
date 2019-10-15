import React from 'react';
import { Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';

/**
 * #92784d Muesli (Light Brown)
 * #5c4632 Deep Bronze (Brown)
 * #2e2824 Bokara Grey (Black)
 * #9e9e9c Mountain Mist (Grey)
 * #9d4a4e Roof Terracotta (Red)
 */

const Card = ({ idx }) => (
  <div
    style={{
      backgroundColor: 'white',
      margin: '0 10px',
      width: '120px',
      height: '200px',
    }}
  >
    {idx}
  </div>
);

Card.propTypes = {
  idx: PropTypes.number.isRequired,
};

const App = () => (
  <Container className="game-board">
    <Row className="board"></Row>
    <Row className="hand">
      <Card idx={1} />
      <Card idx={2} />
      <Card idx={3} />
      <Card idx={4} />
      <Card idx={5} />
      <Card idx={6} />
    </Row>
  </Container>
);

export default App;
