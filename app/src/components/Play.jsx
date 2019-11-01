import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Skeleton from './Skeleton.jsx';
import Room from './Room/Room.jsx';

import MunchkinLogo from '../img/Logos/munchkin-logo.png';

import {
  playInit,
  playIsReady,
  playOnChangeUsername,
  playFetchAvailableRooms,
  playOnSelectRoom,
} from '../redux/actions/play';
import { appPush } from '../redux/actions/app';

import '../css/Play.css';

class Play extends React.Component {
  componentDidMount() {
    this.props.init();
    this.props.fetchRooms();
  }

  componentDidUpdate() {
    if (this.props.roomJoined) {
      this.props.push(<Room />);
    }
  }

  render() {
    const {
      usernameOnChange,
      play,
      rooms,
      fetchingRooms,
      selectRoom,
    } = this.props;

    return (
      <Container className="full-page">
        <Row className="full-page game-background">
          <Col sm={4} />
          <Col sm={4} className="play-form-container">
            <img src={MunchkinLogo} alt="munchkin logo" id="play-logo" />
            <Form>
              <Form.Group controlId="formBasicUsername">
                <Form.Control
                  id="username-input"
                  type="text"
                  placeholder="Entrez votre pseudo"
                  onChange={value => usernameOnChange(value.target.value)}
                />
              </Form.Group>

              <Skeleton loading={fetchingRooms}>
                <Form.Group controlId="formBasicRoomName">
                  <Form.Control
                    as="select"
                    onChange={value =>
                      selectRoom(value.target.value.split(' ')[0])
                    }
                  >
                    <option>Choisir...</option>
                    {rooms.map(room => (
                      <option>
                        {room.name} ({room.takenSeats})
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Skeleton>

              <Button id="play-button" variant="primary" onClick={play}>
                Play
              </Button>
            </Form>
          </Col>
          <Col sm={4} />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    ...state.play,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    init: () => dispatch(playInit()),
    usernameOnChange: value => dispatch(playOnChangeUsername(value)),
    play: () => dispatch(playIsReady()),
    fetchRooms: () => dispatch(playFetchAvailableRooms()),
    selectRoom: roomName => dispatch(playOnSelectRoom(roomName)),
    push: component => dispatch(appPush(component)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Play);
