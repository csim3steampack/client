import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/authentication';
import { LoginView } from '../components';

const propTypes = {
  loginRequest: React.PropTypes.func,
  status: React.PropTypes.string,
  router: React.PropTypes.any,
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    console.log("LOGIN didmount");
  }

  handleLogin(id, password) {
    return this.props.loginRequest(id, password)
    .then(() => {
      if (this.props.status === 'SUCCESS') {
        this.props.router.push('/');
        return true;
      }
      return false;
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

const mapStateToProps = state => ({
  status: state.authentication.login.status,
});

const mapDispatchToProps = dispatch => ({
  loginRequest: (id, password) => dispatch(loginRequest(id, password)),
});

Login.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
