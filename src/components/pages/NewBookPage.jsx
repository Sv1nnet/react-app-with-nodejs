import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import SerchBookForm from '../forms/SerchBookForm';
import BookForm from '../forms/BookForm';

class NewBookPage extends Component {
  state = {
    book: null,
  }

  onBookSelect = book => this.setState(() => ({ book }));

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
