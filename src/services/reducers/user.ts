import {
  GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED,
  PATCH_USER_REQUEST, PATCH_USER_SUCCESS, PATCH_USER_FAILED,
  POST_FORGOT_REQUEST, POST_FORGOT_SUCCESS, POST_FORGOT_FAILED,
  POST_RESET_REQUEST, POST_RESET_SUCCESS, POST_RESET_FAILED,
  POST_LOGIN_REQUEST, POST_LOGIN_SUCCESS, POST_LOGIN_FAILED,
  POST_LOGOUT_REQUEST, POST_LOGOUT_SUCCESS, POST_LOGOUT_FAILED,
  TAnyAction
} from '../actions';

const userInitialState = {
  email: '',
  name: '',
  loadState: ''
}

const updateUserInitialState = {
  email: '',
  name: '',
  password: '',
  loadState: ''
}

const forgotInitialState = {
  state: ''
}

const resetInitialState = {
  state: ''
}

const loginInitialState = {
  login: false
}

const logoutInitialState = {
  login: false
}

export const userReducer = (state = userInitialState, action: TAnyAction) => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        email: '',
        name: '',
        loadState: 'loading'
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        email: action.data.user.email,
        name: action.data.user.name,
        loadState: 'succes'
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        email: '',
        name: '',
        loadState: 'failed'
      };
    }
    default: {
      return state;
    }
  }
}

export const updateUserReducer = (state = updateUserInitialState, action: TAnyAction) => {
  switch (action.type) {
    case PATCH_USER_REQUEST: {
      return {
        ...state,
        email: '',
        name: '',
        password: '',
        loadState: 'loading'
      };
    }
    case PATCH_USER_SUCCESS: {
      return {
        ...state,
        email: action.data.user.email,
        name: action.data.user.name,
        password: action.data.user.password,
        loadState: 'succes'
      };
    }
    case PATCH_USER_FAILED: {
      return {
        ...state,
        email: '',
        name: '',
        password: '',
        loadState: 'failed'
      };
    }
    default: {
      return state;
    }
  }
}

export const loginReducer = (state = loginInitialState, action: TAnyAction) => {
  switch (action.type) {
    case POST_LOGIN_REQUEST: {
      return {
        ...state,
        login: false
      };
    }
    case POST_LOGIN_SUCCESS: {
      return {
        ...state,
        login: true
      };
    }
    case POST_LOGIN_FAILED: {
      return {
        ...state,
        login: false
      };
    }
    default: {
      return state;
    }
  }
}

export const logoutReducer = (state = logoutInitialState, action: TAnyAction) => {
  switch (action.type) {
    case POST_LOGOUT_REQUEST: {
      return {
        ...state,
        login: false
      };
    }
    case POST_LOGOUT_SUCCESS: {
      return {
        ...state,
        login: true
      };
    }
    case POST_LOGOUT_FAILED: {
      return {
        ...state,
        login: false
      };
    }
    default: {
      return state;
    }
  }
}

export const forgotReducer = (state = forgotInitialState, action: TAnyAction) => {
  switch (action.type) {
    case POST_FORGOT_REQUEST: {
      return {
        ...state,
        state: 'request'
      };
    }
    case POST_FORGOT_SUCCESS: {
      return {
        ...state,
        state: 'success',
      };
    }
    case POST_FORGOT_FAILED: {
      return {
        ...state,
        state: 'failed',
      };
    }
    default: {
      return state;
    }
  }
}

export const resetReducer = (state = resetInitialState, action: TAnyAction) => {
  switch (action.type) {
    case POST_RESET_REQUEST: {
      return {
        ...state,
        state: 'request'
      };
    }
    case POST_RESET_SUCCESS: {
      return {
        ...state,
        state: 'success',
      };
    }
    case POST_RESET_FAILED: {
      return {
        ...state,
        state: 'failed',
      };
    }
    default: {
      return state;
    }
  }
}