import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RegisterView } from '../components';
import { registerRequest } from '../actions/authentication';


const propTypes = {
  registerRequest: React.PropTypes.func,
  status: React.PropTypes.string,
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister(id, password) {
    return this.props.registerRequest(id, password).then(
      () => {
        if (this.props.status === 'SUCCESS') {
          this.props.router.push('/login');
          return true;
        }
        return false;
      },
    );
  }

  render() {
    return (
      <div>
        <RegisterView onRegister={this.handleRegister} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authentication.register.status,
    errorCode: state.authentication.register.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerRequest: (id, password) => {
      return dispatch(registerRequest(id, password));
    },
  };
};

Register.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Register);
