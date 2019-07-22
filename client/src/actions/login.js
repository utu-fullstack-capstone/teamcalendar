import axios from 'axios';
import {
  USER_LOADED,
  ADMIN_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT
} from './types';

// set token into axios headers
export const setToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

// check authentication with token and load user data into state
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setToken(localStorage.token);
  }
  try {
    const res = await axios.get('http://localhost:5000/api/auth');
    if (res.data.admin) {
      dispatch({
        type: ADMIN_LOADED,
        payload: res.data
      });
    } else {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// login user
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = {
    email,
    password
  };
  try {
    const res = await axios.post(
      'http://localhost:5000/api/auth/',
      body,
      config
    );
    localStorage.setItem('token', res.data.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      errors.map(error => console.log(error.msg));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  console.log('logout');
  return { type: LOGOUT };
};
