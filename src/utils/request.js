import { BASE_URL } from './consts';

export const checkResponse = res => {
  if (res.ok) {
    return res.json()
  } 
  return Promise.reject(`Ошибка ${res.status}`);
}

export const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

export const request = (endpoint, options) => {
  return fetch(`${BASE_URL}/${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};