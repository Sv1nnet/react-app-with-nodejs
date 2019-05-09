/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from '../forms/LoginForm';
import { login } from '../../actions/auth';

class LoginPage extends Component {
  submit = (data) => {
    const { props } = this;
    return props.login(data).then(() => props.history.push('/'));
  };

  render() {
    return (
      <div>
        <h1>Login Page</h1>

        <LoginForm submit={this.submit} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(LoginPage);
