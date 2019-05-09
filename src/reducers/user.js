import types from '../types';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case types.USER_LOGGED_IN:
      return action.user;

    case types.USER_LOGGED_OUT:
      return {};

    default:
      return state;
  }
};
