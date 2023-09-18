import { IFeed } from '../../utils/feed';

import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    TAnyAction
  } from '../actions';
  
  type TWSState = {
    wsConnected: boolean;
    orders: IFeed[];
    total: string;
    totalToday: string;
    error?: Event;
  }
  
  const initialState: TWSState = {
    wsConnected: false,
    error: undefined,
    orders: [],
    total: '',
    totalToday: '',
  };
  
  export const wsReducer = (state = initialState, action: TAnyAction) => {
    switch (action.type) {
      case WS_CONNECTION_SUCCESS:
        return {
          ...state,
          error: undefined,
          wsConnected: true,
        };
  
      case WS_CONNECTION_ERROR:
        return {
          ...state,
          error: action.error,
          wsConnected: false
        };
  
      case WS_CONNECTION_CLOSED:
        return {
          ...state,
          error: undefined,
          wsConnected: false
        };
  
      case WS_GET_MESSAGE:
        return {
          ...state,
          error: undefined,
          orders: action.orders,
          total: action.total,
          totalToday: action.totalToday,
        };
  
      default:
        return state;
    }
  };