import React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

import '../css/Connecting.css';

export default () => (
  <Container className="full-page">
    <Row className="full-page">
      <Col sm={12} id="spinner-container">
        <Spinner animation="border" />
        <p id="loading-text" className="text-muted">
          Connecting to server...
        </p>
      </Col>
    </Row>
  </Container>
);
