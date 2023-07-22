import {
    WS_ORDERS_CONNECTION_SUCCESS,
    WS_ORDERS_CONNECTION_ERROR,
    WS_ORDERS_CONNECTION_CLOSED,
    WS_ORDERS_GET_MESSAGE,
    TAnyAction
  } from '../actions';
  
  type TWSState = {
    wsConnected: boolean;
    orders: any[];
    error?: Event;
  }
  
  const initialState: TWSState = {
    wsConnected: false,
    error: undefined,
    orders: []
  };
  
  export const wsOrdersReducer = (state = initialState, action: TAnyAction) => {
    switch (action.type) {
      case WS_ORDERS_CONNECTION_SUCCESS:
        return {
          ...state,
          error: undefined,
          wsConnected: true,
        };
  
      case WS_ORDERS_CONNECTION_ERROR:
        return {
          ...state,
          error: action.error,
          wsConnected: false
        };
  
      case WS_ORDERS_CONNECTION_CLOSED:
        return {
          ...state,
          error: undefined,
          wsConnected: false
        };
  
      case WS_ORDERS_GET_MESSAGE:
        return {
          ...state,
          error: undefined,
          orders: action.orders
        };
  
      default:
        return state;
    }
  };