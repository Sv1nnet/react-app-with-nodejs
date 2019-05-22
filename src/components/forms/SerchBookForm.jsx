import React, { Component } from 'react';
import axios from 'axios';
import { Form, Dropdown } from 'semantic-ui-react';

class SerchBookForm extends Component {
  state = {
    query: '',
    loading: false,
    options: [{
      key: 1,
      value: 1,
      text: 'first book',
    },
    {
      key: 2,
      value: 2,
      text: 'second book',
    }],
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
      .then(res => res.data.books);
  }

  render() {
    const { state } = this;

    return (
      <Form>
        <Dropdown
          search
          fluid
          placeholder="Search for a book by title"
          value={state.query}
          onSearchChange={this.onSearchChange}
          options={state.options}
          loading={state.loading}
        />
      </Form>
    );
  }
}

export default SerchBookForm;
