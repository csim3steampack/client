import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TeamList } from '../components';
import { teamViewRequest } from '../actions/teamView';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <TeamList />
      </div>
    );
  }
}

export default Home;
