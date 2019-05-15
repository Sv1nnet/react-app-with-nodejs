import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import isEmail from 'validator/lib/isEmail';
import InlineError from '../messages/InlineError';

class ForgotPasswordForm extends Component {
  state = {
    data: {
      email: '',
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

    if (!isEmail(data.email)) {
      errors.email = 'Invalid email';
    }
    return errors;
  }

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {!!errors.global && <Message negative>{errors.global}</Message>}
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@example.com"
              value={data.email}
              onChange={this.onChange}
            />
          </label>
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Button primary>Submit</Button>
      </Form>
    );
  }
}

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default ForgotPasswordForm;
