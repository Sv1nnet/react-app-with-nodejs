import * as types from '../types';
import api from '../api';

const { USER_LOGGED_IN, USER_LOGGED_OUT } = types.default;

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user,
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT,
});

export const login = credentials => dispatch => api.user.login(credentials).then((user) => {
  localStorage.bookwormJWT = user.token;
  dispatch(userLoggedIn(user));
});

export const logout = () => (dispatch) => {
  localStorage.removeItem('bookwormJWT');
  dispatch(userLoggedOut());
};
