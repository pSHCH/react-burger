import { request } from '../utils/request';

export const getIngredientsRequest = () => {
  return request('ingredients', {})
};

export const postOrderRequest = (data) => {
  return request('orders', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}