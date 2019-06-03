import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import AddBookCta from '../ctas/AddBookCta';
import { allBooksSelector } from '../../reducers/books';
import { fetchBooks } from '../../actions/books';

class DashboardPage extends React.Component {
  componentDidMount = () => this.onInit(this.props)

  onInit = props => props.fetchBooks();

  render() {
    const { isConfirmed, books } = this.props;
    console.log('dashboard render props', this.props);
    return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}

        {books.length === 0 ? <AddBookCta /> : <p>You have books</p>}
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  fetchBooks: PropTypes.func.isRequired,
  books: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

const mapStateToProps = state => ({
  isConfirmed: state.user.confirmed,
  books: allBooksSelector(state),
});

export default connect(mapStateToProps, { fetchBooks })(DashboardPage);
