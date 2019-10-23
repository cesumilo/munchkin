import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import { playIsReady, playOnChangeUsername } from '../redux/actions/play';

import '../css/Play.css';

const Play = ({ usernameOnChange, play }) => (
  <Container className="full-page">
    <Row className="full-page game-background">
      <Col sm={4} />
      <Col sm={4} className="play-form-container">
        <Form>
          <Form.Group controlId="formBasicUsername">
            <Form.Control
              id="username-input"
              type="text"
              placeholder="Enter your username"
              onChange={value => usernameOnChange(value.target.value)}
            />
          </Form.Group>

          <Button id="play-button" variant="primary" onClick={play}>
            Play
          </Button>
        </Form>
      </Col>
      <Col sm={4} />
    </Row>
  </Container>
);

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    usernameOnChange: value => dispatch(playOnChangeUsername(value)),
    play: () => dispatch(playIsReady()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Play);
