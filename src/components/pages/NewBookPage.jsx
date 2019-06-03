import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import SerchBookForm from '../forms/SerchBookForm';
import BookForm from '../forms/BookForm';
import { createBook } from '../../actions/books';

class NewBookPage extends Component {
  state = {
    book: null,
  }

  onBookSelect = (book) => {
    this.setState(() => ({ book }));

    axios
      .get(`/api/books/fetchPages?goodreadsId=${book.goodreadsId}`)
      .then(res => res.data.pages)
      .then(pages => this.setState({ book: { ...book, pages } }));
  }

  addBook = (book) => {
    const { props } = this;
    console.log('NEWBOOKPAGE add book', book);
    return props.createBook(book).then(() => props.history.push('/dashboard'));
  };

  render() {
    const { state } = this;
    return (
      <Segment>
        <h1>Add new book to your collection</h1>
        <SerchBookForm onBookSelect={this.onBookSelect} />

        {state.book && <BookForm submit={this.addBook} book={state.book} />}
      </Segment>
    );
  }
}

NewBookPage.propsTypes = {
  createBook: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, { createBook })(NewBookPage);
