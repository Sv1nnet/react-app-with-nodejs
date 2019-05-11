import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';

const DashboardPage = ({ isConfirmed }) => (
  <div>
    <h1>Dashboard</h1>
    {!isConfirmed && <ConfirmEmailMessage />}
  </div>
);

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  console.log(state);
  return {
    isConfirmed: state.user.confirmed,
  };
}

export default connect(mapStateToProps)(DashboardPage);
