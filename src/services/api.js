import { BASEURL } from '../utils/consts';
import { request } from '../utils/request';

export const getIngredientsRequest = () => {
  return request(`${BASEURL}/ingredients`, {})
  // return await fetch(`${BASEURL}/ingredients`)
  //   .then(checkResponse)
};

export const postOrderRequest = (data) => {
  return request(`${BASEURL}/orders`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    // .then(checkResponse)
    // .catch(err => {
    //   return Promise.reject(`Ошибка ${err.status}`);
    // });
}