import { BrowserRouter } from 'react-router-dom';  
import { compose, createStore, applyMiddleware, ActionCreator, Action } from 'redux';
import { Provider,
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook } from 'react-redux';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import { rootReducer } from './services/reducers';
import reportWebVitals from './reportWebVitals';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import type { ReduxState } from './utils/ReduxState';
import { TAnyAction } from './services/actions';
import { FEEDS_URL, ORDERS_URL } from './utils/consts';
import { socketMiddleware } from './services/middlewares/middlewares';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { TWSStoreActions } from './services/actions/feeds';
import { TWSOrdersStoreActions } from './services/actions/personalFeeds';


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(socketMiddleware(FEEDS_URL, TWSStoreActions)),
    applyMiddleware(socketMiddleware(ORDERS_URL, TWSOrdersStoreActions, true)),
  )
);


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

export type AppDispatch = ThunkDispatch<ReduxState, never, TAnyAction>; 
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, ReduxState, TAnyAction>
>

export const useSelector: TypedUseSelectorHook<ReduxState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch>(); 

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
