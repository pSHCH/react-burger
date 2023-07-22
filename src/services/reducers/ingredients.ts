import { 
  GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_CART, ADD_INGREDIENTS_CART, REMOVE_INGREDIENTS_CART, REMOVE_BUN_INGREDIENTS_CART, UPDATE_INGREDIENTS_CART, REMOVE_INGREDIENTS_ALL_CART,
  INGREDIENTS_MODAL_OPEN, INGREDIENTS_MODAL_CLOSE,
  TAnyAction
} from '../actions';
import type { IIngredient } from '../../utils/ingredient';

const ingredientsInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

const cartInitialState: { ingredientsInCart: IIngredient[] } = {
  ingredientsInCart: [],
};

const ingredientInitialState = {
  ingredient: null,
};

export const ingredientReducer = (state = ingredientInitialState, action: TAnyAction) => {
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

export const ingredientsReducer = (state = ingredientsInitialState, action: TAnyAction) => {
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

export const cartReducer = (state = cartInitialState, action: TAnyAction) => {
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