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

  componentDidMount() {
    console.log("GAMEREGISTER didmount")
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

const mapStateToProps = state => ({
  isSucceed: state.gameRegister.isSucceed,
});

const mapDispatchToProps = dispatch => ({
  gameRegisterRequest: (location, date, ground) => dispatch(gameRegisterRequest(location, date, ground)),
});

GameRegister.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(GameRegister);
