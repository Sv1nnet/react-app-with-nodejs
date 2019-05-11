import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { confirm } from '../../actions/auth';

class ConfirmationPage extends Component {
  state = {
    loading: true,
    success: false,
  }

  componentDidMount() {
    const { props } = this;
    props.confirm(props.match.params.token)
      .then(() => this.setState(() => ({ loading: false, success: true })))
      .catch(() => this.setState(() => ({ loading: false, success: false })));
  }

  render() {
    const { loading, success } = this.state;

    return (
      <div>
        {loading && (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Header>Validationg your email</Message.Header>
          </Message>
        )}

        {!loading && success && (
          <Message success icon>
            <Icon name="checkmark" loading />
            <Message.Header>Thank you. Your account has been verified.</Message.Header>
            <Link to="/dashboard">Go to your dashboard</Link>
          </Message>
        )}

        {!loading && !success && (
          <Message negative icon>
            <Icon name="warning sign" loading />
            <Message.Header>Ooops. Invalid token.</Message.Header>
          </Message>
        )}
      </div>
    );
  }
}

ConfirmationPage.propTypes = {
  confirm: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(null, { confirm })(ConfirmationPage);
