import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TeamList } from '../components';
import { teamViewRequest, groundViewTeamName } from '../actions/teamView';

const propTypes = {
  leaderTeamData: React.PropTypes.array,
  teamViewRequest: React.PropTypes.func,
  groundViewTeamName: React.PropTypes.func,
};

const defaultProps = {
  leaderTeamData: [],
  teamViewRequest: () => console.log('teamViewRequest function is not a defined'),
  groundViewTeamName: () => console.log('groundViewTeamName function is not a defined'),
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

const mapStateToProps = state => ({
  leaderTeamData: state.teamView.teamNameData,
});

const mapDispatchToProps = dispatch => ({
  teamViewRequest: () => dispatch(teamViewRequest()),
  groundViewTeamName: (teamName) => { dispatch(groundViewTeamName(teamName)); },
});

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
