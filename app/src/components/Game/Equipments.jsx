import React from 'react';
import { Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';

import Helmet from '../../img/Icons/helmet.svg';
import Hand1 from '../../img/Icons/hand-1.svg';
import Hand2 from '../../img/Icons/hand-2.svg';
import Chest from '../../img/Icons/chest.svg';
import Boots from '../../img/Icons/boots.svg';
import Other from '../../img/Icons/other-equipments.svg';

import '../../css/Equipments.css';

const Equipment = ({ component, desc }) => {
  const Component = component;
  return (
    <OverlayTrigger
      key="top"
      placement="top"
      overlay={
        <Tooltip id="tooltip-top">
          Pas d'équipement
        </Tooltip>
      }
    >
      <Component className="equip-icon" alt={desc} />
    </OverlayTrigger>
  );
};

const Equipments = () => (
  <Row className="decks-container">
    <Col sm={12} className="col-sm-12" style={{ height: '100%' }}>
      <Row
        style={{
          height: '50%',
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Equipment component={Helmet} desc="Helmet" />
        <Equipment component={Hand1} desc="First hand" />
        <Equipment component={Hand2} desc="Second hand" />
      </Row>
      <Row
        style={{
          height: '50%',
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Equipment component={Chest} desc="Chest" />
        <Equipment component={Boots} desc="Boots" />
        <Equipment component={Other} desc="Other" />
      </Row>
    </Col>
  </Row>
);

export default Equipments;
