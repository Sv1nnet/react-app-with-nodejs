/* eslint-disable import/prefer-default-export */
import { schema } from 'normalizr';

export const bookSchema = new schema.Entity(
  'books',
  {},
  { idAttribute: '_id' },
);
