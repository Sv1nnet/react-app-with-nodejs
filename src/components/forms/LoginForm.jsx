import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import InlineError from '../messages/InlineError';

class LoginForm extends Component {
  state = {
    data: {
      email: '',
      password: '',
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

    this.setState(() => ({
      errors,
    }));

    if (Object.keys(errors).length === 0) {
      submit(data);
    }
  }

  validate = (data) => {
    const errors = {};

    if (!Validator.isEmail(data.email)) {
      errors.email = 'Invalid email';
    }
    if (!data.password) {
      errors.password = "Can't be blank";
    }
    return errors;
  }

  render() {
    const { data, errors } = this.state;
    console.log(data);

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Make it secure"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Button primary>Login</Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default LoginForm;
