import React, { Component } from 'react';

const propTypes = {
  onGameRegister: React.PropTypes.func,
};

class GameRegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      date: '',
      ground: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleGameRegister = this.handleGameRegister.bind(this);
  }

  handleChange(e) {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleGameRegister() {
    const location = this.state.location;
    const date = this.state.date;
    const ground = this.state.ground;

    this.props.onGameRegister(location, date, ground).then(
      (succeed) => {
        if (!succeed) {
          this.setState({
            location: '',
            date: '',
            ground: '',
          });
        }
      },
    );
  }

  render() {
    return (
      <div>
        <div>location</div>
        <input
          name="location"
          type="text"
          className="test-game"
          value={this.state.location}
          onChange={this.handleChange}
        />
        <div>date</div>
        <input
          name="date"
          type="date"
          className="test-game"
          value={this.state.date}
          onChange={this.handleChange}
        />
        <div>ground name</div>
        <input
          name="ground"
          type="text"
          className="test-game"
          value={this.state.ground}
          onChange={this.handleChange}
        />
        <button onClick={this.handleGameRegister}>submit</button>
      </div>
    );
  }
}

GameRegisterView.propTypes = propTypes;

export default GameRegisterView;
