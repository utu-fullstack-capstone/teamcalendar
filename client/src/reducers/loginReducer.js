import {
  USER_LOADED,
  ADMIN_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  LOG_OUT,
  ACCOUNT_DELETED
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isLogin: null,
  isAdmin: false,
  isLoading: true,
  user: null
};

const loginReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isLogin: true,
        isAdmin: false,
        isLoading: false,
        user: payload
      };
    case ADMIN_LOADED:
      return {
        ...state,
        isLogin: true,
        isAdmin: true,
        isLoading: false,
        user: payload
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      console.log('token', payload.token);
      return {
        ...state,
        ...payload,
        isLogin: true,
        isLoading: false
      };
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOG_OUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isLogin: false,
        isAdmin: false,
        isLoading: false
      };
    default:
      return state;
  }
};

export default loginReducer;
