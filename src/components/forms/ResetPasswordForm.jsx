import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import InlineError from '../messages/InlineError';

class ResetPasswordForm extends Component {
  state = {
    data: {
      token: this.props.token,
      password: '',
      passwordConfirmation: '',
    },
    loading: false,
    errors: {},
  }

  onChange = (e) => {
    const { target } = e;

    this.setState(state => ({
      data: {
        ...state.data,
        [target.name]: target.value,
      },
    }));
  }

  onSubmit = () => {
    const { data } = this.state;
    const { submit } = this.props;
    const errors = this.validate(data);

    console.log('data:', submit);

    this.setState(() => ({
      errors,
    }));

    if (Object.keys(errors).length === 0) {
      this.setState(() => ({ loading: true }));
      submit(data).catch(err => this.setState(() => ({ errors: err.response.data.errors, loading: false })));
    }
  }

  validate = (data) => {
    const errors = {};

    if (!data.password) {
      errors.password = "Cant't be blank";
    }
    if (data.password !== data.passwordConfirmation) {
      errors.password = 'Password must match';
    }
    return errors;
  }

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {!!errors.global && <Message negative>{errors.global}</Message>}
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your new password"
              value={data.password}
              onChange={this.onChange}
            />
          </label>
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Form.Field error={!!errors.email}>
          <label htmlFor="passwordConfirmation">Confirm your new password
            <input
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              placeholder="Type it again, please"
              value={data.passwordConfirmation}
              onChange={this.onChange}
            />
          </label>
          {errors.passwordConfirmation && <InlineError text={errors.passwordConfirmation} />}
        </Form.Field>
        <Button primary>Reset</Button>
      </Form>
    );
  }
}

ResetPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default ResetPasswordForm;
