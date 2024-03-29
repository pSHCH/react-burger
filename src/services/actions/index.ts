import { 
  GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_CART, ADD_INGREDIENTS_CART, REMOVE_INGREDIENTS_CART, REMOVE_BUN_INGREDIENTS_CART, UPDATE_INGREDIENTS_CART, REMOVE_INGREDIENTS_ALL_CART,
  INGREDIENTS_MODAL_OPEN, INGREDIENTS_MODAL_CLOSE,
  getIngredients, addToCart,
} from './ingredients'

import { 
  POST_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED,
  postOrder
} from './order'

import {
  GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED,
  PATCH_USER_REQUEST, PATCH_USER_SUCCESS, PATCH_USER_FAILED,
  POST_FORGOT_REQUEST, POST_FORGOT_SUCCESS, POST_FORGOT_FAILED,
  POST_RESET_REQUEST, POST_RESET_SUCCESS, POST_RESET_FAILED,
  POST_LOGIN_REQUEST, POST_LOGIN_SUCCESS, POST_LOGIN_FAILED,
  POST_LOGOUT_REQUEST, POST_LOGOUT_SUCCESS, POST_LOGOUT_FAILED,
  POST_REGISTER_REQUEST, POST_REGISTER_SUCCESS, POST_REGISTER_FAILED,
  POST_TOKEN_REQUEST, POST_TOKEN_SUCCESS, POST_TOKEN_FAILED,
  register, login, logout, forgot, reset, getUser, updateUser, checkUserToken,
} from './user';

import {
  WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE, WS_SEND_MESSAGE
} from './feeds';

import {
  WS_ORDERS_CONNECTION_START, WS_ORDERS_CONNECTION_SUCCESS, WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_CLOSED, WS_ORDERS_GET_MESSAGE, WS_ORDERS_SEND_MESSAGE,
} from './personalFeeds';

import { TIngredientActions } from './ingredients';
import { TOrdersActions } from './order';
import { TUserActions } from './user';
import { TWSActions } from './feeds';
import { TWSOrdersActions } from './personalFeeds';

export const SET_TAB_ACTIVE: 'SET_TAB_ACTIVE' = 'SET_TAB_ACTIVE';

type TTabAction = { (): {
  readonly type: typeof SET_TAB_ACTIVE,
  readonly tab: string
} }
export type TTabActions = TTabAction;

export { 
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
  POST_REGISTER_REQUEST, POST_REGISTER_SUCCESS, POST_REGISTER_FAILED,
  POST_TOKEN_REQUEST, POST_TOKEN_SUCCESS, POST_TOKEN_FAILED,
  WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE, WS_SEND_MESSAGE,
  WS_ORDERS_CONNECTION_START, WS_ORDERS_CONNECTION_SUCCESS, WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_CLOSED, WS_ORDERS_GET_MESSAGE, WS_ORDERS_SEND_MESSAGE,

  register, login, logout, forgot, reset, getUser, updateUser, checkUserToken,
  postOrder,
  getIngredients, addToCart,
 };

export type TAnyAction = ReturnType<TIngredientActions 
                                    | TOrdersActions 
                                    | TUserActions
                                    | TTabActions
                                    | TWSActions
                                    | TWSOrdersActions>;