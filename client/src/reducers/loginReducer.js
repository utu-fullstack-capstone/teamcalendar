import {
  USER_LOADED,
  ADMIN_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  LOGOUT,
  ACCOUNT_DELETED
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isLogin: false,
  isAdmin: false,
  isLoading: true,
  user: { name: '', email: '', _id: '' }
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
      return {
        ...state,
        ...payload,
        isLogin: true,
        isLoading: false
      };
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
    case ACCOUNT_DELETED:
      return {
        token: null,
        isLogin: false,
        isAdmin: false,
        isLoading: false,
        user: null
      };
    default:
      return state;
  }
};

export default loginReducer;
