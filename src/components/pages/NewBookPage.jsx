import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import axios from 'axios';
import SerchBookForm from '../forms/SerchBookForm';
import BookForm from '../forms/BookForm';

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

  addBook = () => console.log('hi');

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

export default NewBookPage;
