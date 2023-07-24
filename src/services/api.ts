import { request } from '../utils/request';
import { getCookie, setCookie } from '../utils/cookie';

const tokenRequest = () => {
  return request(`auth/token`, {
    method: 'POST', 
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: getCookie('refreshToken')
    }),
  })
}

export const fetchWithRefresh = async (url: string, options?: RequestInit) => {
  try {
    return request(`${url}`, options);
  } catch (err) {
    if ((err as Error).message === 'jwt expired') {

      const refreshData: { refreshToken?: string; accessToken?: string;  } = await tokenRequest();

      if (refreshData.accessToken) {
        setCookie(
          'token', refreshData.accessToken, { path: '/' });
      }
      if (refreshData.refreshToken) {
        setCookie('refreshToken', refreshData.refreshToken, { path: '/' });
      }
      
      if (! options) options = {};
      options.headers = new Headers(options.headers);
      options.headers.set('authorization', String(refreshData.accessToken));
      
      return request(`${url}`, options);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getIngredientsRequest = () => {
  return request('ingredients', {})
};

export const postOrderRequest = (data: {'ingredients': string[]}) => {
  return fetchWithRefresh('orders', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: getCookie('token') || ''
    },
    body: JSON.stringify(data),
  })
}

export const registerRequest = (data: {
  'email': string,
  'password': string,
  'name': string
}) => {
  return request('auth/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
};

export const loginRequest = (data: {
  'email': string,
  'password': string 
}) => {
  return request(`auth/login`, {
    method: 'POST', 
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const logoutRequest = (data: { 'token': string }) => {
  return request(`auth/logout`, {
    method: 'POST', 
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const checkToken = (data: { 'token': string }) => {
  return request(`auth/token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const forgotRequest = (data: { 'email': string }) => {
  return request(`password-reset`, {
    method: 'POST', 
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const resetRequest = (data: {
  'token': string, 
  'password': string
}) => {
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
  return fetchWithRefresh(`auth/user`, {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('token') || ''
    },
  })
}

export const updateUserRequest = (data: {
  'email'?: string,
  'password'?: string,
  'name'?: string,
}) => {
  return fetchWithRefresh(`auth/user`, {
    method: 'PATCH', 
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('token') || ''
    },
    body: JSON.stringify(data),
  })
}

