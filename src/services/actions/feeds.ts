import { IFeed } from '../../utils/feed';

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

type IWSConnectionStart = { (): {readonly type: typeof WS_CONNECTION_START} }
type IWSConnectionSuccessAction = { (): {readonly type: typeof WS_CONNECTION_SUCCESS} }
type IWSConnectionErrorAction = { (): {
    error: Event;
    readonly type: typeof WS_CONNECTION_ERROR
} }
type IWSConnectionClosedAction = { (): {readonly type: typeof WS_CONNECTION_CLOSED} }
type IWSGetMessageAction = { (): {
  readonly type: typeof WS_GET_MESSAGE;

  readonly orders: IFeed[]
  readonly total: string
  readonly totalToday: string
} }
type IWSSendMessageAction = { (): {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: { message: string };
} }

export type TWSActions =
            | IWSConnectionStart
            | IWSConnectionSuccessAction
            | IWSConnectionErrorAction
            | IWSConnectionClosedAction
            | IWSGetMessageAction
            | IWSSendMessageAction; 

export const TWSStoreActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};