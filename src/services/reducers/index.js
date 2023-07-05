import { combineReducers } from 'redux';

import { orderReducer } from './orders.js';
import { ingredientsReducer, ingredientReducer, cartReducer } from './ingredients.js';
import { tabReducer } from './tab.js';
import { userReducer, updateUserReducer, forgotReducer, resetReducer, loginReducer, logoutReducer } from './user.js';

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
});