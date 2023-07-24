import {  
  postOrderRequest,
} from '../api';
import { AppDispatch } from '../..';

export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = 'POST_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';

type TOrderAction = { (): {
  readonly type: typeof POST_ORDER_REQUEST,
  readonly data: {'ingredients': string[]}
} };

type TOrderSuccessAction = { (): {
  readonly type: typeof GET_ORDER_SUCCESS,
  readonly data: {
    data: any;
    accessToken: string;
    refreshToken: string;
    success?: boolean | undefined;
  }
}};

type TOrderFailedAction = { (): {
  readonly type: typeof GET_ORDER_FAILED
} };

export type TOrdersActions = TOrderAction | TOrderSuccessAction | TOrderFailedAction;

export const postOrder = (data: {'ingredients': string[]}) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: POST_ORDER_REQUEST,
      data: data,
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
        type: GET_ORDER_FAILED
      });
    });
  };
}