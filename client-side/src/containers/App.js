import React, { Component } from 'react';
import { Header } from '../components';

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

App.propTypes = {
  children: React.PropTypes.any,
};

export default App;
