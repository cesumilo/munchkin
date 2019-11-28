import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Equipments from './Equipments.jsx';
import PlayerInfo from './PlayerInfo.jsx';
import CardInfo from './CardInfo.jsx';

import BackgroundClosed from '../../img/Backgrounds/closed_doors.png';
import BackgroundLeft from '../../img/Backgrounds/left_side.png';
import BackgroundRight from '../../img/Backgrounds/right_side.png';

import '../../css/GameBoard.css';

const GameBoard = ({player}) => (
  <Row className="board">
    <Col sm={2} className="col-sm-2 board-col left-side">
      <img
        id="left-side-background"
        src={BackgroundLeft}
        alt="Left side background"
      />
      <Col sm={12} className="left-side-info">
        <PlayerInfo player={player}/>
        <CardInfo />
        <Equipments />
      </Col>
    </Col>
    <Col
      sm={8}
      className="col-sm-8 board-col"
      style={{ backgroundImage: `url(${BackgroundClosed})` }}
    >
      <Row style={{ height: '90%' }} />
      <Row style={{ height: '10%' }} />
    </Col>
    <Col sm={2} className="col-sm-2 board-col right-side">
      <img id="right-side-background" src={BackgroundRight} alt="left" />
    </Col>
  </Row>
);

export default GameBoard;
