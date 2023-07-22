import { v4 as uuidv4 } from 'uuid';
import { 
  getIngredientsRequest,
} from '../api';
import { AppDispatch } from '../..';
import type { IIngredient } from '../../utils/ingredient';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

export const GET_INGREDIENTS_CART: 'GET_INGREDIENTS_CART' = 'GET_INGREDIENTS_CART';
export const ADD_INGREDIENTS_CART: 'ADD_INGREDIENTS_CART' = 'ADD_INGREDIENTS_CART';
export const REMOVE_INGREDIENTS_CART: 'REMOVE_INGREDIENTS_CART' = 'REMOVE_INGREDIENTS_CART';
export const REMOVE_BUN_INGREDIENTS_CART: 'REMOVE_BUN_INGREDIENTS_CART' = 'REMOVE_BUN_INGREDIENTS_CART';
export const UPDATE_INGREDIENTS_CART: 'UPDATE_INGREDIENTS_CART' = 'UPDATE_INGREDIENTS_CART';
export const REMOVE_INGREDIENTS_ALL_CART: 'REMOVE_INGREDIENTS_ALL_CART' = 'REMOVE_INGREDIENTS_ALL_CART';

export const INGREDIENTS_MODAL_OPEN: 'INGREDIENTS_MODAL_OPEN' = 'INGREDIENTS_MODAL_OPEN';
export const INGREDIENTS_MODAL_CLOSE: 'INGREDIENTS_MODAL_CLOSE' = 'INGREDIENTS_MODAL_CLOSE';


type TIngredientsAction = { (): {readonly type: typeof GET_INGREDIENTS_REQUEST} }
type TIngredientsSuccessAction = { (): {
  readonly type: typeof GET_INGREDIENTS_SUCCESS,
  readonly data: IIngredient[]
} }
type TIngredientsFailedAction = { (): {readonly type: typeof GET_INGREDIENTS_FAILED} }

type TIngredientsCartAction = { (): {readonly type: typeof GET_INGREDIENTS_CART} }
type TIngredientsAddCartAction = { (): {
  readonly type: typeof ADD_INGREDIENTS_CART,
   item: IIngredient,
   payload: {
    id: string
  }
} }
type TIngredientsRemoveCartAction = { (): {
  readonly type: typeof REMOVE_INGREDIENTS_CART,
  readonly item: IIngredient,

} }
type TIngredientsRemoveBunCartAction = { (): {readonly type: typeof REMOVE_BUN_INGREDIENTS_CART} }
type TIngredientsUpdateCartAction = { (): {
  readonly type: typeof UPDATE_INGREDIENTS_CART,
  cards: IIngredient[]
} }
type TIngredientsRemoveAllCartAction = { (): {readonly type: typeof REMOVE_INGREDIENTS_ALL_CART} }

type TIngredientsModalOpenAction = { (): {
  readonly type: typeof INGREDIENTS_MODAL_OPEN,
  readonly ingredient: IIngredient,
} }
type TIngredientsModalCloseAction = { (): {readonly type: typeof INGREDIENTS_MODAL_CLOSE} }

export type TIngredientActions = TIngredientsAction 
                                 | TIngredientsSuccessAction 
                                 | TIngredientsFailedAction
                                 | TIngredientsCartAction
                                 | TIngredientsAddCartAction
                                 | TIngredientsRemoveCartAction
                                 | TIngredientsRemoveBunCartAction
                                 | TIngredientsUpdateCartAction
                                 | TIngredientsRemoveAllCartAction
                                 | TIngredientsModalOpenAction
                                 | TIngredientsModalCloseAction;

export const getIngredients = () => {
  return function(dispatch: AppDispatch) {
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

export const addToCart = (data: IIngredient) => {
  return {
    type: ADD_INGREDIENTS_CART,
    payload: {
      ...data,  
      id: uuidv4()
    }
  }
}
