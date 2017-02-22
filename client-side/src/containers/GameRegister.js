import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GameRegisterView } from '../components';
import { gameRegisterRequest, gameRegisterPhotoRequest, gameRegisterCheckRequest } from '../actions/gameRegister';

const propTypes = {
  gameRegisterRequest: React.PropTypes.func,
  status: React.PropTypes.string,
  gameRegisterPhotoRequest: React.PropTypes.func,
  playPlace: React.PropTypes.string,
  allGameRegisterData: React.PropTypes.object,
  gameRegisterCheckRequest: React.PropTypes.func,
};

const defaultProps = {
  gameRegisterRequest: () => console.log('gameRegisterRequest function is not a defined'),
  status: undefined,
  gameRegisterPhotoRequest: () => console.log('gameRegisterPhotoRequest function is not a defined'),
  playPlace: undefined,
  allGameRegisterData: {},
  gameRegisterCheckRequest: () => console.log('gameRegisterCheckRequest function is not a defined'),
};


class GameRegister extends Component {
  constructor(props) {
    super(props);
    this.handleGameRegister = this.handleGameRegister.bind(this);
    this.onGameRegisterPhoto = this.onGameRegisterPhoto.bind(this);
  }

  componentDidMount() {
    this.props.gameRegisterCheckRequest();
  }

  onGameRegisterPhoto(photoData) {
    this.props.gameRegisterPhotoRequest(photoData);
  }

  handleGameRegister(location, date, ground) {
    return this.props.gameRegisterRequest(location, date, ground)
    .then(() => {
      if (this.props.status === 'SUCCESS') {
        this.props.gameRegisterCheckRequest();
        return true;
      }
      return false;
    });
  }

  render() {
    return (
      <div>
        <GameRegisterView
          onGameRegister={this.handleGameRegister}
          onGameRegisterPhoto={this.onGameRegisterPhoto}
          playPlace={this.props.playPlace}
          allGameRegisterData={this.props.allGameRegisterData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  status: state.gameRegister.status,
  playPlace: state.gameRegister.playPlace,
  allGameRegisterData: state.gameRegister.allGameRegisterData,
});

const mapDispatchToProps = dispatch => ({
  gameRegisterRequest: (location, date, ground) =>
    dispatch(gameRegisterRequest(location, date, ground)),
  gameRegisterPhotoRequest: photoData => dispatch(gameRegisterPhotoRequest(photoData)),
  gameRegisterCheckRequest: () => dispatch(gameRegisterCheckRequest()),
});

GameRegister.propTypes = propTypes;
GameRegister.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(GameRegister);
