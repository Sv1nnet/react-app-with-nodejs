/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import {
  Form,
  Button,
  Segment,
  Grid,
  Image,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import InlineError from '../messages/InlineError';

class BookForm extends Component {
  state = {
    data: {
      goodreadsId: this.props.book.goodreadsId,
      title: this.props.book.title,
      authors: this.props.book.authors,
      cover: this.props.book.covers[0],
      pages: this.props.book.pages,
    },
    covers: this.props.book.covers,
    index: 0,
    loading: false,
    errors: {},
  }

  componentWillReceiveProps = (props) => {
    this.setState(() => ({
      data: {
        goodreadsId: props.book.goodreadsId,
        title: props.book.title,
        authors: props.book.authors,
        cover: props.book.covers[0],
        pages: props.book.pages,
      },
      covers: props.book.covers,
    }));
  }

  onChange = (e) => {
    const { target } = e;

    this.setState(state => ({
      data: {
        ...state.data,
        [target.name]: target.value,
      },
    }));
  }

  onChangeNumber = (e) => {
    const { target } = e;

    this.setState(state => ({
      data: {
        ...state.data,
        [target.name]: parseInt(target.value, 10),
      },
    }));
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { data } = this.state;
    const { submit } = this.props;
    const errors = this.validate(data);

    this.setState(() => ({ errors }));

    if (Object.keys(errors).length === 0) {
      this.setState(() => ({ loading: true }));
      submit(data).catch((err) => {
        console.log('err', err);
        this.setState(() => ({ errors: err.response.data.errors, loading: false }));
      });
    }
  }

  validate = (data) => {
    const errors = {};

    if (!data.title) {
      errors.title = "Can't be blank";
    }
    if (!data.authors) {
      errors.authors = "Can't be blank";
    }
    if (!data.pages) {
      errors.pages = "Can't be blank";
    }
    return errors;
  }

  changeCover = () => {
    const { index, covers } = this.state;
    const newIndex = index + 1 >= covers.length ? 0 : index + 1;

    this.setState(state => ({
      index: newIndex,
      data: { ...state.data, cover: covers[newIndex] },
    }));
  }

  render() {
    const {
      data,
      errors,
      loading,
      covers,
    } = this.state;

    return (
      <Segment>
        <Form onSubmit={this.onSubmit} loading={loading}>
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column>
                <Form.Field error={!!errors.title}>
                  <label htmlFor="title">Title
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Title"
                      value={data.title}
                      onChange={this.onChange}
                    />
                  </label>
                  {errors.title && <InlineError text={errors.title} />}
                </Form.Field>

                <Form.Field error={!!errors.title}>
                  <label htmlFor="authors">Authors
                    <input
                      type="text"
                      id="authors"
                      name="authors"
                      placeholder="Authors"
                      value={data.authors}
                      onChange={this.onChange}
                    />
                  </label>
                  {errors.authors && <InlineError text={errors.authors} />}
                </Form.Field>

                <Form.Field error={!!errors.pages}>
                  <label htmlFor="authors">Pages
                    <input
                      disabled={!data.pages}
                      type="text"
                      id="pages"
                      name="pages"
                      placeholder="Pages"
                      value={data.pages || 'Loading...'}
                      onChange={this.onChangeNumber}
                    />
                  </label>
                  {errors.pages && <InlineError text={errors.pages} />}
                </Form.Field>
              </Grid.Column>

              <Grid.Column>
                <Image size="small" src={data.cover} />
                {covers.length > 1 && <a role="button" tabIndex={0} onClick={this.changeCover}>Another cover</a>}
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Button primary>Save</Button>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

BookForm.propTypes = {
  submit: PropTypes.func.isRequired,
  book: PropTypes.shape({
    goodreadsId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    covers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    pages: PropTypes.number,
  }).isRequired,
};

export default BookForm;
