import { combineReducers } from 'redux';
import { 
    GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_CART, ADD_INGREDIENTS_CART, REMOVE_INGREDIENTS_CART, REMOVE_BUN_INGREDIENTS_CART, UPDATE_INGREDIENTS_CART, REMOVE_INGREDIENTS_ALL_CART,
    INGREDIENTS_MODAL_OPEN, INGREDIENTS_MODAL_CLOSE,
    POST_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED,
    GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED,
    PATCH_USER_REQUEST, PATCH_USER_SUCCESS, PATCH_USER_FAILED,
    POST_FORGOT_REQUEST, POST_FORGOT_SUCCESS, POST_FORGOT_FAILED,
    POST_RESET_REQUEST, POST_RESET_SUCCESS, POST_RESET_FAILED,
    POST_LOGIN_REQUEST, POST_LOGIN_SUCCESS, POST_LOGIN_FAILED,
    POST_LOGOUT_REQUEST, POST_LOGOUT_SUCCESS, POST_LOGOUT_FAILED,
    SET_TAB_ACTIVE,
} from '../actions';

const ingredientsInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

const cartInitialState = {
  ingredientsInCart: [],
};

const ingredientInitialState = {
  ingredient: null,
};

const orderInitialState = {
  order: null,
  data: null,
};

const tabState = {
  tab: 'bun',
};

const userInitialState = {
  email: '',
  name: '',
  loadState: ''
}

const updateUserInitialState = {
  email: '',
  name: '',
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

const userReducer = (state = userInitialState, action) => {
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

const updateUserReducer = (state = updateUserInitialState, action) => {
  switch (action.type) {
    case PATCH_USER_REQUEST: {
      return {
        ...state,
        email: '',
        name: '',
        loadState: 'loading'
      };
    }
    case PATCH_USER_SUCCESS: {
      return {
        ...state,
        email: action.data.user.email,
        name: action.data.user.name,
        loadState: 'succes'
      };
    }
    case PATCH_USER_FAILED: {
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

const tabReducer = (state = tabState, action) => {
  switch (action.type) {
    case SET_TAB_ACTIVE: {
      return {
        ...state,
        tab: action.tab
      };
    }
    default: {
      return state;
    }
  }
}

const loginReducer = (state = loginInitialState, action) => {
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

const logoutReducer = (state = logoutInitialState, action) => {
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

const forgotReducer = (state = forgotInitialState, action) => {
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

const resetReducer = (state = resetInitialState, action) => {
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

const orderReducer = (state = orderInitialState, action) => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        data: action.data,
        order: null,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.data,
        data: null,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        order: null,
        data: null,
      };
    }
    default: {
      return state;
    }
  }
}

const ingredientReducer = (state = ingredientInitialState, action) => {
  switch (action.type) {
    case INGREDIENTS_MODAL_OPEN: {
      return {
        ...state,
        ingredient: action.ingredient
      };
    }
    case INGREDIENTS_MODAL_CLOSE: {
      return {
        ...state,
        ingredient: null
      };
    }
    default: {
      return state;
    }
  }
}

const ingredientsReducer = (state = ingredientsInitialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredients: action.data,
      };
    }
    default: {
      return state;
    }
  }
}

const cartReducer = (state = cartInitialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_CART: {
      return {
        ...state,
        ingredientsInCart: [...state.ingredientsInCart]
      };
    }
    case ADD_INGREDIENTS_CART: {
      const bunArr = [...state.ingredientsInCart].filter(item => item.type === 'bun');
      const otherArr = [...state.ingredientsInCart].filter(item => item.type !== 'bun');
      const totalArr = otherArr.concat({...action.item, ...action.payload}).concat(bunArr);

      return {
        ...state,
        ingredientsInCart: totalArr
      };
    }
    case REMOVE_INGREDIENTS_CART: {
      const index = [...state.ingredientsInCart].indexOf(action.item);
      const halfBefore = [...state.ingredientsInCart].slice(0, index)
      const halfAfter = [...state.ingredientsInCart].slice(index+1);  
      const arr = halfBefore.concat(halfAfter);

      return {
        ...state,
        ingredientsInCart: arr
      };
    }
    case REMOVE_INGREDIENTS_ALL_CART: {
      return {
        ...state,
        ingredientsInCart: []
      };
    }
    case REMOVE_BUN_INGREDIENTS_CART: {
      return {
        ...state,
        ingredientsInCart: [...state.ingredientsInCart].filter(item => item.type !== 'bun'),
      };
    }
    case UPDATE_INGREDIENTS_CART: {
      return {
        ...state,
        ingredientsInCart: action.cards
      };
    }
    default: {
      return state;
    }
  }
}

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredient: ingredientReducer,
  cart: cartReducer,
  order: orderReducer,
  tab: tabReducer,
  user: userReducer,
  updateUser: updateUserReducer,
  forgot: forgotReducer,
  reset: resetReducer,
  login: loginReducer,
  logout: logoutReducer,
});