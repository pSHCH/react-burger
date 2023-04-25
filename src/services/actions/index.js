import { getIngredientsRequest, postOrderRequest } from '../api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const GET_INGREDIENTS_CART = 'GET_INGREDIENTS_CART';
export const ADD_INGREDIENTS_CART = 'ADD_INGREDIENTS_CART';
export const REMOVE_INGREDIENTS_CART = 'REMOVE_INGREDIENTS_CART';
export const REMOVE_BUN_INGREDIENTS_CART = 'REMOVE_BUN_INGREDIENTS_CART';
export const UPDATE_INGREDIENTS_CART = 'UPDATE_INGREDIENTS_CART';

export const INGREDIENTS_MODAL_OPEN = 'INGREDIENTS_MODAL_OPEN';
export const INGREDIENTS_MODAL_CLOSE = 'INGREDIENTS_MODAL_CLOSE';

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const SET_TAB_ACTIVE = 'SET_TAB_ACTIVE';

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

export function postOrder(data) {
  return function(dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST
    });
    postOrderRequest(data).then(res => {
      dispatch({
        type: GET_ORDER_SUCCESS,
        data: res
      });
    })
    .catch(err => {
      console.error(`Ошибка ${err.status}`)
      dispatch({
        type: GET_INGREDIENTS_FAILED
      });
    });
  };
}