import React from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import '../../css/Card.css';

import CardImgSrc from '../../img/Dungeon/Amazone.jpg';

const Card = ({ sm }) => (
  <Col className={`col-sm-${sm} card-container`} sm={sm}>
    <div className="card-img-container">
      <img
        className="card-game-img"
        src={CardImgSrc}
        alt="card"
      />
    </div>
  </Col>
);

Card.propTypes = {
  sm: PropTypes.number.isRequired,
};

export default Card;
