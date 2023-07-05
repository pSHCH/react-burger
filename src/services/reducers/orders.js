import {
  POST_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED,
} from '../actions';


const orderInitialState = {
  order: null,
  data: null,
};

export const orderReducer = (state = orderInitialState, action) => {
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