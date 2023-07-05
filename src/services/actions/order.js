import {  
  postOrderRequest,
} from '../api';

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

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
        type: GET_ORDER_FAILED
      });
    });
  };
}