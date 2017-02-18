import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Ground } from '../components';
import { groundDisplayRequest } from '../actions/groundDisplay';

const propTypes = {
  groundDisplayRequest: React.PropTypes.func,
  teamPlayerName: React.PropTypes.string,
  allDisplayTeam: React.PropTypes.object,
};

class GroundDisplay extends Component {

  componentDidMount() {
    console.log("GroundDisplay didmount")
    this.props.groundDisplayRequest(this.props.teamPlayerName);
  }

  render() {
    return (
      <div>
        <Ground allDisplayTeam={this.props.allDisplayTeam} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allDisplayTeam: state.groundDisplay.displayTeamData,
  teamPlayerName: state.teamView.teamNameValue,
});

const mapDispatchToProps = dispatch => ({
  groundDisplayRequest: selectedTeam => dispatch(groundDisplayRequest(selectedTeam)),
});

GroundDisplay.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(GroundDisplay);
