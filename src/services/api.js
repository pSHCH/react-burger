import { request } from '../utils/request';
import { getCookie } from '../utils/cookie';

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

export const registerRequest = (data) => {
  return request('auth/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
};

export const loginRequest = (data) => {
  return request(`auth/login`, {
    method: 'POST', 
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const logoutRequest = (data) => {
  return request(`auth/logout`, {
    method: 'POST', 
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const tokenRequest = (data) => {
  return request(`auth/token`, {
    method: 'POST', 
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const forgotRequest = (data) => {
  return request(`password-reset`, {
    method: 'POST', 
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const resetRequest = (data) => {
  return request(`password-reset/reset`, {
    method: 'POST', 
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const userRequest = () => {
  return request(`auth/user`, {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('token')
    },
  })
}

export const checkToken = (data) => {
  return request(`auth/token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}