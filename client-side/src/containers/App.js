import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from '../actions/authentication';
import { Header } from '../components';

const propTypes = {
  children: React.PropTypes.any,
  status: React.PropTypes.object,
  getStatusRequest: React.PropTypes.func,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    console.log('hi');
    const getCookie = (name) => {
      const value = '; ' + document.cookie;
      const parts = value.split('; ' + name + '=');
      if (parts.length === 2) {
        return parts.pop().split(';').shift();
      }
    };

    let loginData = getCookie('key');

    if (typeof loginData === 'undefined') {
      console.log("loginData is undefined")
      return;
    }

    loginData = JSON.parse(atob(loginData));

    if (!loginData.isLoggedIn) {
      return;
    }

    this.props.getStatusRequest().then(
      () => {
        if (!this.props.status.valid) {
          loginData = {
            isLoggedIn: false,
            currentUserId: '',
          };
          document.cookie = 'key=' + btoa(JSON.stringify(loginData));
          alert("have a problem");
        }
      }
    );
  }

  handleLogout() {
    this.props.logoutRequest().then(
      () => {
        alert("good bye");

        const loginData = {
          isLoggedIn: false,
          currentUserId: '',
        };
        document.cookie = 'key=' + btoa(JSON.stringify(loginData));
      },
    );
  }

  render() {
    const header = <Header onLogout={this.handleLogout} />;
    return (
      <div>
        {this.props.status.isLoggedIn ? header : undefined }
        {this.props.children}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    status: state.authentication.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStatusRequest: () => {
      return dispatch(getStatusRequest());
    },
    logoutRequest: () => {
      return dispatch(logoutRequest());
    },
  };
};

App.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(App);
