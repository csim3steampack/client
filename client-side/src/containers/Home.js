import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TeamList } from '../components';
import { teamViewRequest, groundViewTeamName } from '../actions/teamView';

const propTypes = {
  leaderTeamData: React.PropTypes.array,
  teamViewRequest: React.PropTypes.func,
  groundViewTeamName: React.PropTypes.func,
};

class Home extends Component {
  componentDidMount() {
    this.props.teamViewRequest();
  }

  render() {
    return (
      <div>
        <TeamList
          teamData={this.props.leaderTeamData}
          handleClick={this.props.groundViewTeamName}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    leaderTeamData: state.teamView.teamNameData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    teamViewRequest: () => {
      return dispatch(teamViewRequest());
    },
    groundViewTeamName: (teamName) => { dispatch(groundViewTeamName(teamName)); },
  };
};

Home.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
