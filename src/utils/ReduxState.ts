import { IIngredient } from './ingredient';
import { IFeed } from './feed';

export interface ReduxState {
  cart: {
    ingredientsInCart: IIngredient[];
  };
  forgot: {
    state: string;
  };
  reset: {
    state: string;
  };
  login: {
    login: boolean;
  };
  logout: {
    logout: boolean;
  };
  ingredient: {
    ingredient: IIngredient;
  };
  ingredients: {
    ingredients: IIngredient[]
    ingredientsRequest: boolean;
    ingredientsFailed: boolean
  };
  order: {
    order?: {
      order?: {
        number?: string;
      };
      name?: string
    };
    data: null;
  };
  updateUser: {
    email: string;
    loadState: string;
    name: string;
    password: string;
  };
  user: {
    email: string;
    loadState: string;
    name: string;
  };
  tab: {
    tab: string;
  };
  feeds: {
    wsConnected: boolean;
    error: Event;
    orders: any[];
    total: string;
    totalToday: string;
  };
  personalFeeds: {
    wsConnected: boolean;
    error: Event;
    orders: any[];
    total: string;
    totalToday: string;
  };
}