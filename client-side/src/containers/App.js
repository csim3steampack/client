import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutRequest, getStatusRequest } from '../actions/authentication';
import { Header } from '../components';

const propTypes = {
  children: React.PropTypes.any,
  status: React.PropTypes.object,
  getStatusRequest: React.PropTypes.func,
  router: React.PropTypes.any,
  logoutRequest: React.PropTypes.func,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: this.props.status.isLoggedIn,
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    const getCookie = (name) => {
      const value = '; ' + document.cookie;
      const parts = value.split('; ' + name + '=');
      if (parts.length === 2) {
        return parts.pop().split(';').shift();
      }
    };
this.props.getStatusRequest();
    /* loginData setup here */
    let loginData = getCookie('key');
    if (typeof loginData === 'undefined') {
      return;
    }
    loginData = JSON.parse(atob(loginData));
    if (!loginData.isLoggedIn) {
      return;
    }

    /* userToken setup here */
    const userToken = localStorage.getItem('user_token');
    if (userToken === loginData.currentUserId) {
      this.setState({
        isLoggedIn: loginData.isLoggedIn,
      });
    } else {
      loginData = {
        isLoggedIn: false,
        currentUserId: '',
      };
      document.cookie = 'key=' + btoa(JSON.stringify(loginData));
    }
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
        this.props.router.push('/login');
      },
    );
  }

  render() {
    return (
      <div>
        <Header onLogout={this.handleLogout} isLoggedIn={this.state.isLoggedIn} />
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
    logoutRequest: () => {
      return dispatch(logoutRequest());
    },
    getStatusRequest: () => {
      return dispatch(getStatusRequest());
    },
  };
};

App.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(App);
