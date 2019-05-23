import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Dropdown } from 'semantic-ui-react';

class SerchBookForm extends Component {
  state = {
    query: '',
    loading: false,
    options: [],
    books: {},
  }

  onSearchChange = (e, data) => {
    clearTimeout(this.timer);
    this.setState(() => ({ query: data }));
    this.timer = setTimeout(this.fetchOptions, 1000);
  }

  fetchOptions = () => {
    const { state } = this;
    if (!state.query) return;

    this.setState(() => ({ loading: true }));
    axios
      .get(`/api/books/search?q=${state.query.searchQuery}`)
      .then(res => res.data.books)
      .then((books) => {
        const options = [];
        const booksHash = {};

        books.forEach((book) => {
          booksHash[book.goodreadsId] = book;
          options.push({
            key: book.goodreadsId,
            value: book.goodreadsId,
            text: book.title,
          });
        });

        this.setState(() => ({ loading: false, options, books: booksHash }));
      });
  }

  onChange = (e, data) => {
    const { props, state } = this;
    this.setState(
      () => ({ query: data.value }),
      () => { props.onBookSelect(state.books[data.value]); },
    );
  }

  render() {
    const { state } = this;

    return (
      <Form>
        <Dropdown
          search
          fluid
          placeholder="Search for a book by title"
          value={state.query.searchQuery}
          onSearchChange={this.onSearchChange}
          options={state.options}
          loading={state.loading}
          onChange={this.onChange}
        />
      </Form>
    );
  }
}

SerchBookForm.propTypes = {
  onBookSelect: PropTypes.func.isRequired,
};

export default SerchBookForm;
