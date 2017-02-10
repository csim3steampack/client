import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Ground } from '../components';
import { groundDisplayRequest } from '../actions/groundDisplay';


class GroundDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeName: [],
      awayName: [],
    };
  }

  componentDidMount() {
    this.props.groundDisplayRequest().then(
      () => {
        const homeArray = [];
        const awayArray = [];
        for (let i = 0; i < this.props.teamMembers.length; i += 1) {
          const teamMembers = this.props.teamMembers;
          if (teamMembers[i].team === '1') {
            homeArray.push(teamMembers[i].name);
          } else if (teamMembers[i].team === '2') {
            awayArray.push(teamMembers[i].name);
          }
        }

        this.setState({
          homeName: homeArray,
          awayName: awayArray,
        });
      },
  );
  } // componentDidMount done here

  render() {
    return (
      <div>
        <Ground homeName={this.state.homeName} awayName={this.state.awayName} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    teamMembers: state.groundDisplay.teamData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    groundDisplayRequest: () => {
      return dispatch(groundDisplayRequest());
    },
  };
};

GroundDisplay.propTypes = {
  teamMembers: React.PropTypes.any,
  groundDisplayRequest: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(GroundDisplay);
