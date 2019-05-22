import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import SerchBookForm from '../forms/SerchBookForm';

class NewBookPage extends Component {
  state = {
    book: null,
  }

  render() {
    return (
      <Segment>
        <h1>Add new book to your collection</h1>
        <SerchBookForm />
      </Segment>
    );
  }
}

export default NewBookPage;
