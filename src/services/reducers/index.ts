import { combineReducers } from 'redux';

import { orderReducer } from './orders';
import { ingredientsReducer, ingredientReducer, cartReducer } from './ingredients';
import { tabReducer } from './tab';
import { userReducer, updateUserReducer, forgotReducer, resetReducer, loginReducer, logoutReducer } from './user';
import { wsReducer } from './feeds';
import { wsOrdersReducer } from './personalFeeds';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredient: ingredientReducer,
  cart: cartReducer,
  order: orderReducer,
  tab: tabReducer,
  user: userReducer,
  updateUser: updateUserReducer,
  forgot: forgotReducer,
  reset: resetReducer,
  login: loginReducer,
  logout: logoutReducer,
  feeds: wsReducer,
  personalFeeds: wsOrdersReducer,
});