import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import AddBookCta from '../ctas/AddBookCta';
import { allBooksSelector } from '../../reducers/books';

const DashboardPage = ({ isConfirmed, books }) => (
  <div>
    {!isConfirmed && <ConfirmEmailMessage />}

    {books.length === 0 && <AddBookCta />}
  </div>
);

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  books: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

const mapStateToProps = state => ({
  isConfirmed: state.user.confirmed,
  books: allBooksSelector(state),
});

export default connect(mapStateToProps)(DashboardPage);
