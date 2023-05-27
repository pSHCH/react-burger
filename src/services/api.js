import { request } from '../utils/request';
import { getCookie, setCookie } from '../utils/cookie';
import { BASE_URL } from '../utils/consts'


const checkReponse = (res) => {
  return res.ok ? 
    res.json() 
    : res.json().then((err) => Promise.reject(err));
};

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

const fetchWithRefresh = async (url, options) => {
  
  try {
    const res = await fetch(`${BASE_URL}/${url}`, options);

    return await checkReponse(res);
  } catch (err) {
    if (err.message === 'jwt expired') {

      const refreshData = await tokenRequest();

      if (refreshData.accessToken) {
        setCookie(
          'token', refreshData.accessToken, { path: '/' });
      }
      if (refreshData.refreshToken) {
        setCookie('refreshToken', refreshData.refreshToken, { path: '/' });
      }
      
      options.headers.Authorization = refreshData.accessToken;
      const res = await fetch(`${BASE_URL}/${url}`, options);
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getIngredientsRequest = () => {
  return request('ingredients', {})
};

export const postOrderRequest = (data) => {
  return fetchWithRefresh('orders', {
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
  return fetchWithRefresh(`auth/user`, {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('token')
    },
  })
}

export const updateUserRequest = (data) => {
  return fetchWithRefresh(`auth/user`, {
    method: 'PATCH', 
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('token')
    },
    body: JSON.stringify(data),
  })
}

