import type { Middleware, MiddlewareAPI } from 'redux';

import type { TWSStoreActions } from '../actions/feeds';
import type { TWSOrdersStoreActions } from '../actions/personalFeeds';
import { AppDispatch } from '../..';
import type { ReduxState } from '../../utils/ReduxState';
import { TAnyAction } from '../actions';
import { getCookie } from '../../utils/cookie';
import { fetchWithRefresh } from '../api';

export const socketMiddleware = (
  wsUrl: string, 
  wsActions: typeof TWSStoreActions | typeof TWSOrdersStoreActions,
  withToken?: boolean): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, ReduxState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TAnyAction) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;


      let token = getCookie('token');
      if(token){
        token = token.replace('Bearer ','')
      }

      const url = withToken ? `${wsUrl}?token=${token}` : wsUrl;
      
      if (type === wsInit) {
        socket = new WebSocket(url);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, error: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, error: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData: any = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, ...restParsedData });
        };

        socket.onclose = (event: CloseEvent) => {
          if (event.reason === 'Invalid or missing token') {
            fetchWithRefresh(`profile/orders`, {
              method: 'GET', 
              headers: {
                'Content-Type': 'application/json',
                Authorization: getCookie('token') || ''
              }
            })
          } else {
            dispatch({ type: onClose, error: event });
          }
        };
      }

      next(action);
    };
  }) as Middleware;
};