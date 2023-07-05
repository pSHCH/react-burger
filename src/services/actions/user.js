import { 
  registerRequest,
  loginRequest,
  forgotRequest,
  resetRequest,
  logoutRequest,
  userRequest,
  updateUserRequest,
  checkToken,
} from '../api';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const POST_REGISTER_REQUEST = 'POST_REGISTER_REQUEST';
export const POST_REGISTER_SUCCESS = 'POST_REGISTER_SUCCESS';
export const POST_REGISTER_FAILED = 'POST_REGISTER_FAILED';

export const POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST';
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_FAILED = 'POST_LOGIN_FAILED';

export const POST_LOGOUT_REQUEST = 'POST_LOGOUT_REQUEST';
export const POST_LOGOUT_SUCCESS = 'POST_LOGOUT_SUCCESS';
export const POST_LOGOUT_FAILED = 'POST_LOGOUT_FAILED';

export const POST_FORGOT_REQUEST = 'POST_FORGOT_REQUEST';
export const POST_FORGOT_SUCCESS = 'POST_FORGOT_SUCCESS';
export const POST_FORGOT_FAILED = 'POST_FORGOT_FAILED';

export const POST_RESET_REQUEST = 'POST_RESET_REQUEST';
export const POST_RESET_SUCCESS = 'POST_RESET_SUCCESS';
export const POST_RESET_FAILED = 'POST_RESET_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST';
export const PATCH_USER_SUCCESS = 'PATCH_USER_SUCCESS';
export const PATCH_USER_FAILED = 'PATCH_USER_FAILED';

export const POST_TOKEN_REQUEST = 'GET_USER_REQUEST';
export const POST_TOKEN_SUCCESS = 'GET_USER_SUCCESS';
export const POST_TOKEN_FAILED = 'GET_USER_FAILED';

export function register(data) {
  return function(dispatch) {
    dispatch({
      type: POST_REGISTER_REQUEST
    });
    registerRequest(data).then(res => {
      const token = res.accessToken.split('Bearer ')[1];
      if (token) {
        setCookie('token', token, { path: '/' });
      }
      dispatch({
        type: POST_REGISTER_SUCCESS,
        data: res
      });
    })
    .catch(err => {
      console.error(`${err}`)
      dispatch({
        type: POST_REGISTER_FAILED
      });
    });
  }
};

export function login(data) {
  return function(dispatch) {
    dispatch({
      type: POST_LOGIN_REQUEST
    });
    loginRequest(data).then(res => {
      if (res.accessToken) {
        setCookie('token', res.accessToken, { path: '/' }, { path: '/' });
      }
      if (res.refreshToken) {
        setCookie('refreshToken', res.refreshToken, { path: '/' });
      }

      dispatch({
        type: POST_LOGIN_SUCCESS,
        data: res
      });
    })
    .catch(err => {
      console.error(`${err}`)
      dispatch({
        type: POST_LOGIN_FAILED
      });
    });
  }
};

export function logout(data) {
  return function(dispatch) {
    dispatch({
      type: POST_LOGOUT_REQUEST
    });
    logoutRequest(data).then(res => {
      deleteCookie('token', { path: '/' });
      deleteCookie('refreshToken', { path: '/' });
      deleteCookie('order', { path: '/' });
      dispatch({ type: POST_LOGIN_FAILED });
      
      dispatch({
        type: POST_LOGOUT_SUCCESS,
        data: res
      });
    })
    .catch(err => {
      console.error(`${err}`)
      dispatch({
        type: POST_LOGOUT_FAILED
      });
    });
  }
};

export function forgot(data) {
  return function(dispatch) {
    dispatch({
      type: POST_FORGOT_REQUEST
    });
    forgotRequest(data).then(res => {
      dispatch({
        type: POST_FORGOT_SUCCESS,
        data: res
      });
    })
    .catch(err => {
      console.error(`${err}`)
      dispatch({
        type: POST_FORGOT_FAILED
      });
    });
  }
};

export function reset(data) {
  return function(dispatch) {
    dispatch({
      type: POST_RESET_REQUEST
    });
    resetRequest(data).then(res => {
      dispatch({
        type: POST_RESET_SUCCESS,
        data: res
      });
    })
    .catch(err => {
      console.error(`${err}`)
      dispatch({
        type: POST_RESET_FAILED
      });
    });
  }
};

export function getUser(data) {
  return function(dispatch) {
    dispatch({
      type: GET_USER_REQUEST
    });
    userRequest(data).then(res => {
      dispatch({
        type: GET_USER_SUCCESS,
        data: res
      });
    })
    .catch(err => {
      console.error(`${err}`)
      dispatch({
        type: GET_USER_FAILED
      });
    });
  }
};

export function updateUser(data) {
  return function(dispatch) {
    dispatch({
      type: PATCH_USER_REQUEST
    });
    updateUserRequest(data).then(res => {
      dispatch({
        type: PATCH_USER_SUCCESS,
        data: res
      });
    })
    .catch(err => {
      console.error(`${err}`)
      dispatch({
        type: PATCH_USER_FAILED
      });
    });
  }
};

export function checkUserToken(data) {
  return function(dispatch) {
    dispatch({
      type: POST_TOKEN_REQUEST
    });
    checkToken(data).then(res => {
      if (res.accessToken) {
        setCookie('token', res.accessToken, { path: '/' });
      }
      if (res.refreshToken) {
        setCookie('refreshToken', res.refreshToken, { path: '/' });
      }
        
      dispatch({
        type: POST_TOKEN_SUCCESS,
        data: res
      });
    })
    .catch(err => {
      console.error(`${err}`)
      dispatch({
        type: POST_TOKEN_FAILED
      });
    });
  }   
}