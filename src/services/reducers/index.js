import { combineReducers } from 'redux';
import { 
    GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_CART, ADD_INGREDIENTS_CART, REMOVE_INGREDIENTS_CART, REMOVE_BUN_INGREDIENTS_CART, UPDATE_INGREDIENTS_CART,
    INGREDIENTS_MODAL_OPEN, INGREDIENTS_MODAL_CLOSE,
    POST_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED,
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
});