import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutRequest, getStatusRequest } from '../actions/authentication';
import { Header } from '../components';

const localStorage = window.localStorage;

const propTypes = {
  children: React.PropTypes.any,
  getStatusRequest: React.PropTypes.func,
  router: React.PropTypes.any,
  logoutRequest: React.PropTypes.func,
  isSucceed: React.PropTypes.bool,
  currentUserID: React.PropTypes.string,
};

const defaultProps = {
  children: undefined,
  getStatusRequest: () => console.log('getStatusRequest function is not a defined'),
  router: undefined,
  logoutRequest: () => console.log('logoutRequest function is not a defined'),
  isSucceed: true,
  currentUserID: undefined,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    console.log('APP willmount');
    const userToken = JSON.parse(localStorage.getItem('user_token'));
    if (userToken) {
      this.props.getStatusRequest();
    } else if (this.props.currentUserID === undefined) {
      this.handleLogout();
    } else {
      this.handleLogout();
    }
  }

  handleLogout() {
    this.props.router.push('/login');
    this.props.logoutRequest();
  }

  render() {
    const header = (
      <Header
        onLogout={this.handleLogout}
        isSucceed={this.props.isSucceed}
      />
    );

    return (
      <div>
        {!this.props.currentUserID ? undefined : header}
        {this.props.children}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  currentUserID: state.authentication.status.currentUserID,
  isSucceed: state.gameRegister.isSucceed,
  profileIsSucceed: state.profile.profileIsSucceed,
});

const mapDispatchToProps = dispatch => ({
  logoutRequest: () => dispatch(logoutRequest()),
  getStatusRequest: () => dispatch(getStatusRequest()),
});

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(App);
