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
import { AppDispatch } from '../..';

export const POST_REGISTER_REQUEST: 'POST_REGISTER_REQUEST' = 'POST_REGISTER_REQUEST';
export const POST_REGISTER_SUCCESS: 'POST_REGISTER_SUCCESS' = 'POST_REGISTER_SUCCESS';
export const POST_REGISTER_FAILED: 'POST_REGISTER_FAILED' = 'POST_REGISTER_FAILED';

export const POST_LOGIN_REQUEST: 'POST_LOGIN_REQUEST' = 'POST_LOGIN_REQUEST';
export const POST_LOGIN_SUCCESS: 'POST_LOGIN_SUCCESS' = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_FAILED: 'POST_LOGIN_FAILED' = 'POST_LOGIN_FAILED';

export const POST_LOGOUT_REQUEST: 'POST_LOGOUT_REQUEST' = 'POST_LOGOUT_REQUEST';
export const POST_LOGOUT_SUCCESS: 'POST_LOGOUT_SUCCESS' = 'POST_LOGOUT_SUCCESS';
export const POST_LOGOUT_FAILED: 'POST_LOGOUT_FAILED' = 'POST_LOGOUT_FAILED';

export const POST_FORGOT_REQUEST: 'POST_FORGOT_REQUEST' = 'POST_FORGOT_REQUEST';
export const POST_FORGOT_SUCCESS: 'POST_FORGOT_SUCCESS' = 'POST_FORGOT_SUCCESS';
export const POST_FORGOT_FAILED: 'POST_FORGOT_FAILED' = 'POST_FORGOT_FAILED';

export const POST_RESET_REQUEST: 'POST_RESET_REQUEST' = 'POST_RESET_REQUEST';
export const POST_RESET_SUCCESS: 'POST_RESET_SUCCESS' = 'POST_RESET_SUCCESS';
export const POST_RESET_FAILED: 'POST_RESET_FAILED' = 'POST_RESET_FAILED';

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';

export const PATCH_USER_REQUEST: 'PATCH_USER_REQUEST' = 'PATCH_USER_REQUEST';
export const PATCH_USER_SUCCESS: 'PATCH_USER_SUCCESS' = 'PATCH_USER_SUCCESS';
export const PATCH_USER_FAILED: 'PATCH_USER_FAILED' = 'PATCH_USER_FAILED';

export const POST_TOKEN_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const POST_TOKEN_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const POST_TOKEN_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';

type TRegisterAction = { (): {readonly type: typeof POST_REGISTER_REQUEST} }
type TRegisterSuccessAction = { (): {readonly type: typeof POST_REGISTER_SUCCESS} }
type TRegisterFailedAction = { (): {readonly type: typeof POST_REGISTER_FAILED} }

type TLoginAction = { (): {readonly type: typeof POST_LOGIN_REQUEST} }
type TLoginSuccessAction = { (): {readonly type: typeof POST_LOGIN_SUCCESS} }
type TLoginFailedAction = { (): {readonly type: typeof POST_LOGIN_FAILED} }

type TLogoutAction = { (): {readonly type: typeof POST_LOGOUT_REQUEST} }
type TLogoutSuccessAction = { (): {readonly type: typeof POST_LOGOUT_SUCCESS} }
type TLogoutFailedAction = { (): {readonly type: typeof POST_LOGOUT_FAILED} }

type TForgotAction = { (): {readonly type: typeof POST_FORGOT_REQUEST} }
type TForgotSuccessAction = { (): {readonly type: typeof POST_FORGOT_SUCCESS} }
type TForgotFailedAction = { (): {readonly type: typeof POST_FORGOT_FAILED} }

type TResetAction = { (): {readonly type: typeof POST_RESET_REQUEST} }
type TResetSuccessAction = { (): {readonly type: typeof POST_RESET_SUCCESS} }
type TResetFailedAction = { (): {readonly type: typeof POST_RESET_FAILED} }

type TUserAction = { (): {readonly type: typeof GET_USER_REQUEST} }
type TUserSuccessAction = { (): {
  readonly type: typeof GET_USER_SUCCESS,
  readonly data: any
} }
type TUserFailedAction = { (): {readonly type: typeof GET_USER_FAILED} }

type TUserPatchAction = { (): {readonly type: typeof PATCH_USER_REQUEST} }
type TUserPatchSuccessAction = { (): {
  readonly type: typeof PATCH_USER_SUCCESS, 
  readonly data: any
} }
type TUserPatchFailedAction = { (): {readonly type: typeof PATCH_USER_FAILED} }

type TTokenAction = { (): {readonly type: typeof POST_TOKEN_REQUEST} }
type TTokenSuccessAction = { (): {
  readonly type: typeof POST_TOKEN_SUCCESS,
  readonly data: any
} }
type TTokenFailedAction = { (): {readonly type: typeof POST_TOKEN_FAILED} }

export type TUserActions = TRegisterAction
                           | TRegisterSuccessAction
                           | TRegisterFailedAction
                           | TLoginAction
                           | TLoginSuccessAction
                           | TLoginFailedAction
                           | TLogoutAction
                           | TLogoutSuccessAction
                           | TLogoutFailedAction
                           | TForgotAction
                           | TForgotSuccessAction
                           | TForgotFailedAction
                           | TResetAction
                           | TResetSuccessAction
                           | TResetFailedAction
                           | TUserAction
                           | TUserSuccessAction
                           | TUserFailedAction
                           | TUserPatchAction
                           | TUserPatchSuccessAction
                           | TUserPatchFailedAction
                           | TTokenAction
                           | TTokenSuccessAction
                           | TTokenFailedAction;

export const register = (data: {
  'email': string,
  'password': string,
  'name': string
}) => {
  return function(dispatch: AppDispatch) {
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

export const login = (data: {
  'email': string,
  'password': string 
}) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: POST_LOGIN_REQUEST
    });
    loginRequest(data).then(res => {
      if (res.accessToken) {
        setCookie('token', res.accessToken, { path: '/' });
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

export const logout = (data: { 'token': string }) => {
  return function(dispatch: AppDispatch) {
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

export const forgot = (data: { 'email': string }) => {
  return function(dispatch: AppDispatch) {
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

export const reset = (data: {
  'token': string, 
  'password': string
}) => {
  return function(dispatch: AppDispatch) {
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

export const getUser = () => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST
    });
    userRequest().then(res => {
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

export const updateUser = (data: {
  'email'?: string,
  'password'?: string,
  'name'?: string,
}) => {
  return function(dispatch: AppDispatch) {
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

export const checkUserToken = (data: { 'token': string }) => {
  return function(dispatch: AppDispatch) {
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