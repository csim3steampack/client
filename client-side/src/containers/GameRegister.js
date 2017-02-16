import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GameRegisterView } from '../components';
import { gameRegisterRequest } from '../actions/gameRegister';

const propTypes = {
  gameRegisterRequest: React.PropTypes.func,
  isSucceed: React.PropTypes.bool,
  router: React.PropTypes.any,
};


class GameRegister extends Component {
  constructor(props) {
    super(props);
    this.handleGameRegister = this.handleGameRegister.bind(this);
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
        <GameRegisterView onGameRegister={this.handleGameRegister} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSucceed: state.gameRegister.isSucceed,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    gameRegisterRequest: (location, date, ground) => {
      return dispatch(gameRegisterRequest(location, date, ground));
    },
  };
};

GameRegister.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(GameRegister);
