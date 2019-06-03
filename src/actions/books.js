/* eslint-disable import/prefer-default-export */
import { normalize } from 'normalizr';
import types from '../types';
import api from '../api';
import { bookSchema } from '../schemas';

const { BOOKS_FETCHED, BOOK_CREATED } = types;
// data.entities.books
const booksFetched = (data) => {
  console.log('booksFetched', data);
  return ({
    type: BOOKS_FETCHED,
    data,
  });
};

const bookCreated = (data) => {
  console.log('bookCreated', data);
  return ({
    type: BOOK_CREATED,
    data,
  });
};

export const fetchBooks = () => dispatch => api.books.fetchAll().then(books => dispatch(booksFetched(normalize(books, [bookSchema]))));

export const createBook = data => dispatch => api.books.create(data).then((book) => {
  const createdBook = bookCreated(normalize(book, bookSchema));
  console.log('createdBook', createdBook);
  return dispatch(createdBook);
});
