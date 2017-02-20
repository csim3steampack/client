import React, { Component } from 'react';

const propTypes = {
  onGameRegister: React.PropTypes.func,
};

const defaultProps = {
  onGameRegister: () => console.log('onGameRegister function is not a defined'),
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

    this.props.onGameRegister(location, date, ground)
    .then(
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
        <div>경기장소 ("구"를 선택해 주세요)</div>
        <input
          name="location"
          type="text"
          className="test-game"
          value={this.state.location}
          onChange={this.handleChange}
        />
        <div>경기날짜</div>
        <input
          name="date"
          type="date"
          className="test-game"
          value={this.state.date}
          onChange={this.handleChange}
        />
        <div>경기 운동장</div>
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
GameRegisterView.defaultProps = defaultProps;

export default GameRegisterView;
