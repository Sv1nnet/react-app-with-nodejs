/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { resetPasswordRequest } from '../../actions/auth';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';

class ForgotPasswordPage extends Component {
  state = {
    success: false,
  }

  submit = (data) => {
    const { props } = this;
    return props.resetPasswordRequest(data).then(() => { this.setState({ success: true }); });
  };

  render() {
    const { state } = this;

    return (
      <div>
        {state.success ? <Message>Email has been sent.</Message> : <ForgotPasswordForm submit={this.submit} />}
      </div>
    );
  }
}

ForgotPasswordPage.propTypes = {
  resetPasswordRequest: PropTypes.func.isRequired,
};

export default connect(null, { resetPasswordRequest })(ForgotPasswordPage);
