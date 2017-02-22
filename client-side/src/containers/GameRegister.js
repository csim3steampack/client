import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GameRegisterView } from '../components';
import { gameRegisterRequest, gameRegisterPhotoRequest } from '../actions/gameRegister';

const propTypes = {
  gameRegisterRequest: React.PropTypes.func,
  isSucceed: React.PropTypes.bool,
  router: React.PropTypes.any,
  gameRegisterPhotoRequest: React.PropTypes.func,
};

const defaultProps = {
  gameRegisterRequest: () => console.log('gameRegisterRequest function is not a defined'),
  isSucceed: false,
  router: undefined,
  gameRegisterPhotoRequest: () => console.log('gameRegisterPhotoRequest function is not a defined'),
};


class GameRegister extends Component {
  constructor(props) {
    super(props);
    this.handleGameRegister = this.handleGameRegister.bind(this);
    this.onGameRegisterPhoto = this.onGameRegisterPhoto.bind(this);
  }

  onGameRegisterPhoto(photoData) {
    this.props.gameRegisterPhotoRequest(photoData);
  }

  handleGameRegister(location, date, ground) {
    return this.props.gameRegisterRequest(location, date, ground)
    .then(() => {
      if (this.props.isSucceed) {
        this.props.router.push('/');
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
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isSucceed: state.gameRegister.isSucceed,
});

const mapDispatchToProps = dispatch => ({
  gameRegisterRequest: (location, date, ground) =>
    dispatch(gameRegisterRequest(location, date, ground)),
  gameRegisterPhotoRequest: photoData => dispatch(gameRegisterPhotoRequest(photoData)),
});

GameRegister.propTypes = propTypes;
GameRegister.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(GameRegister);
