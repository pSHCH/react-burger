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

const fetchWithRefresh = async (url: string, options?: RequestInit) => {
  try {
    return request(`${url}`, options);
  } catch (err) {
    if ((err as Error).message === 'jwt expired') {

      const refreshData: { data?: any; refreshToken?: string; accessToken?: string;  } = await tokenRequest();

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

export const postOrderRequest = (data: any) => {
  return fetchWithRefresh('orders', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const registerRequest = (data: any) => {
  return request('auth/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
};

export const loginRequest = (data: any) => {
  return request(`auth/login`, {
    method: 'POST', 
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const logoutRequest = (data: any) => {
  return request(`auth/logout`, {
    method: 'POST', 
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const checkToken = (data: any) => {
  return request(`auth/token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const forgotRequest = (data: any) => {
  return request(`password-reset`, {
    method: 'POST', 
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const resetRequest = (data: any) => {
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

export const updateUserRequest = (data: any) => {
  return fetchWithRefresh(`auth/user`, {
    method: 'PATCH', 
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('token') || ''
    },
    body: JSON.stringify(data),
  })
}

