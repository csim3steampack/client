import React, { Component } from 'react';
import { LoginView } from '../components';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/authentication';


class Login extends Component {
  render() {
    return (
      <div>
        <LoginView />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authentication.login.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (id, password) => {
      return dispatch(loginRequest(id, password));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
