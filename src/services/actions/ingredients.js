import { v4 as uuidv4 } from 'uuid';
import { 
  getIngredientsRequest,
} from '../api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const GET_INGREDIENTS_CART = 'GET_INGREDIENTS_CART';
export const ADD_INGREDIENTS_CART = 'ADD_INGREDIENTS_CART';
export const REMOVE_INGREDIENTS_CART = 'REMOVE_INGREDIENTS_CART';
export const REMOVE_BUN_INGREDIENTS_CART = 'REMOVE_BUN_INGREDIENTS_CART';
export const UPDATE_INGREDIENTS_CART = 'UPDATE_INGREDIENTS_CART';
export const REMOVE_INGREDIENTS_ALL_CART = 'REMOVE_INGREDIENTS_ALL_CART';

export const INGREDIENTS_MODAL_OPEN = 'INGREDIENTS_MODAL_OPEN';
export const INGREDIENTS_MODAL_CLOSE = 'INGREDIENTS_MODAL_CLOSE';

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredientsRequest().then(res => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        data: res.data
      });
    })
    .catch(err => {
      console.error(`Ошибка ${err.status}`)
    });
  };
}


export function addToCart(data) {
  return {
    type: ADD_INGREDIENTS_CART,
    payload: {
      ...data,  
      id: uuidv4()
    }
  }
}
