import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Ground } from '../components';
import { groundDisplayRequest } from '../actions/groundDisplay';

const propTypes = {
  groundDisplayRequest: React.PropTypes.func,
  selectedTeam: React.PropTypes.string,
  allDisplayTeam: React.PropTypes.object,
};

const defaultProps = {
  groundDisplayRequest: () => console.log('groundDisplayRequest function is not a defined'),
  selectedTeam: undefined,
  allDisplayTeam: {},
};

class GroundDisplay extends Component {
  componentWillMount() {
    this.props.groundDisplayRequest(this.props.selectedTeam);
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
  selectedTeam: state.teamView.teamNameValue,
});

const mapDispatchToProps = dispatch => ({
  groundDisplayRequest: selectedTeam => dispatch(groundDisplayRequest(selectedTeam)),
});

GroundDisplay.propTypes = propTypes;
GroundDisplay.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(GroundDisplay);
