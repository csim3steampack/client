import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Ground } from '../components';
import { groundDisplayRequest } from '../actions/groundDisplay';


class GroundDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMembers: '',
      awayMembers: '',
    };
  }

  componentDidMount() {
    this.props.groundDisplayRequest()
    .then(
      () => {
        const homeArray = [];
        const awayArray = [];
        for (let i = 0; i < this.props.teamMembers.length; i += 1) {
          const teamMembers = this.props.teamMembers;
          if (teamMembers[i].team === this.props.teamPlayerName) {
            awayArray.push(teamMembers[i]);
          } else {
            homeArray.push(teamMembers[i]);
          }
        }

        this.setState = {
          userMembers: homeArray,
          awayMembers: awayArray,
        };
      },
  );
  } // componentDidMount done here

  render() {
    return (
      <div>
        <Ground homeName={this.state.userMembers} awayName={this.state.awayMembers} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    teamMembers: state.groundDisplay.teamData,
    teamPlayerName: state.teamView.teamNameValue,
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
  teamMembers: React.PropTypes.array,
  groundDisplayRequest: React.PropTypes.func,
  teamPlayerName: React.PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(GroundDisplay);
