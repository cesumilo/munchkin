import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Coins from '../../img/Icons/coins.svg';

import '../../css/PlayerInfo.css';

const PlayerInfo = () => (
  <Row className="player-info-container">
    <Col className="col-sm-12 player-info-col" sm={12}>
      <Row>
        <Col sm={6} className="player-info-texts">
          <span className="ingame-title">Player</span>
          <span className="ingame-desc">Level : 1</span>
          <span className="ingame-desc">Humain</span>
        </Col>
        <Col sm={6} className="player-info-texts">
          <span className="ingame-desc">
            0 <Coins className="player-coins-img" />
          </span>
          <span className="ingame-desc">Force : 1</span>
          <span className="ingame-desc">None</span>
        </Col>
      </Row>
    </Col>
  </Row>
);

export default PlayerInfo;
