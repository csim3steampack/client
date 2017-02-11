import React, { Component } from 'react';
import { Header } from '../components';

const propTypes = {
  children: React.PropTypes.any,
};

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
