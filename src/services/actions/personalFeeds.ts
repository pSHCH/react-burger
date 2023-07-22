export const WS_ORDERS_CONNECTION_START: 'WS_ORDERS_CONNECTION_START' = 'WS_ORDERS_CONNECTION_START';
export const WS_ORDERS_CONNECTION_SUCCESS: 'WS_ORDERS_CONNECTION_SUCCESS' = 'WS_ORDERS_CONNECTION_SUCCESS';
export const WS_ORDERS_CONNECTION_ERROR: 'WS_ORDERS_CONNECTION_ERROR' = 'WS_ORDERS_CONNECTION_ERROR';
export const WS_ORDERS_CONNECTION_CLOSED: 'WS_ORDERS_CONNECTION_CLOSED' = 'WS_ORDERS_CONNECTION_CLOSED';
export const WS_ORDERS_GET_MESSAGE: 'WS_ORDERS_GET_MESSAGE' = 'WS_ORDERS_GET_MESSAGE';
export const WS_ORDERS_SEND_MESSAGE: 'WS_ORDERS_SEND_MESSAGE' = 'WS_ORDERS_SEND_MESSAGE';

type IWSOrdersConnectionStart = { (): {readonly type: typeof WS_ORDERS_CONNECTION_START} }
type IWSOrdersConnectionSuccessAction = { (): {readonly type: typeof WS_ORDERS_CONNECTION_SUCCESS} }
type IWSOrdersConnectionErrorAction = { (): {
    error: any;
    readonly type: typeof WS_ORDERS_CONNECTION_ERROR
} }
type IWSOrdersConnectionClosedAction = { (): {readonly type: typeof WS_ORDERS_CONNECTION_CLOSED} }
type IWSOrdersGetMessageAction = { (): {
  readonly type: typeof WS_ORDERS_GET_MESSAGE;

  readonly orders: any[]
  readonly total: string
  readonly totalToday: string
} }
type IWSOrdersSendMessageAction = { (): {
  readonly type: typeof WS_ORDERS_SEND_MESSAGE;
  readonly payload: { message: string };
} }

export type TWSOrdersActions =
            | IWSOrdersConnectionStart
            | IWSOrdersConnectionSuccessAction
            | IWSOrdersConnectionErrorAction
            | IWSOrdersConnectionClosedAction
            | IWSOrdersGetMessageAction
            | IWSOrdersSendMessageAction; 

export const TWSOrdersStoreActions = {
  wsInit: WS_ORDERS_CONNECTION_START,
  wsSendMessage: WS_ORDERS_SEND_MESSAGE,
  onOpen: WS_ORDERS_CONNECTION_SUCCESS,
  onClose: WS_ORDERS_CONNECTION_CLOSED,
  onError: WS_ORDERS_CONNECTION_ERROR,
  onMessage: WS_ORDERS_GET_MESSAGE,
};