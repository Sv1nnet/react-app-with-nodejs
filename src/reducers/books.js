import { createSelector } from 'reselect';
import types from '../types';

const { BOOKS_FETCHED, BOOK_CREATED } = types;

export default function books(state = { books: [] }, action = {}) {
  switch (action.type) {
    case BOOKS_FETCHED:
    case BOOK_CREATED:
      return { ...state, ...action.data.entities.books };
    default:
      return state;
  }
}

// SELECTORS

export const booksSelector = (state) => {
  console.log('booksSelector', state);
  return state.books;
};

export const allBooksSelector = createSelector(
  booksSelector,
  (booksHash) => {
    console.log('booksHash', booksHash);
    return Object.values(booksHash);
  },
);
