import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/authentication';
import { LoginView } from '../components';

const propTypes = {
  loginRequest: React.PropTypes.func,
  status: React.PropTypes.string,
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(id, password) {
    return this.props.loginRequest(id, password)
    .then(() => {
      if (this.props.status === 'SUCCESS') {
        const loginData = {
          isLoggedIn: true,
          currentUserId: id,
        };
        document.cookie = 'key=' + btoa(JSON.stringify(loginData));
        this.props.router.push('/');
        return true;
      } else {
        return false;
      }
    });
  }

  render() {
    return (
      <div>
        <LoginView onLogin={this.handleLogin} />
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

Login.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
