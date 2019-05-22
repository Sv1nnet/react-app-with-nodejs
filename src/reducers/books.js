import { createSelector } from 'reselect';
// import types from '../types';

export default function books(state = { books: [] }, action = {}) {
  switch (action.type) {
    // case types.BOOKS_FETCHED:
    // case types.BOOK_CREATED:
    //   return { ...state, ...action.data.entities.books };
    default:
      return state;
  }
}

// SELECTORS

export const booksSelector = state => state.books || [];

export const allBooksSelector = createSelector(
  booksSelector,
  booksHash => Object.values(booksHash),
);
