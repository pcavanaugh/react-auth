import client from './api-client';

const AUTH_TOKEN_KEY = 'ACCESS_TOKEN';

export const getAuthToken = () => {
  if (!window.localStorage) return null;
  const token = window.localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) return null;
  return JSON.parse(token);
};

const setAuthToken = (accessToken) => {
  if (!window.localStorage) return null;
  window.localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(accessToken));
}

export const getUser = async () => {
  const token = getAuthToken();
  if (!token) return null;
  const { userId, accessToken } = token;
  return client(`/users/${userId}`, { headers: {
    authorization: `bearer ${accessToken}`
  }})
}

export const login = ({ username, password }) => {
  return client('/oauth/token', {
    body: { username, password, grant_type: 'password' }
  })
    .then((response) => {
      if (response.access_token) {
        setAuthToken({
          accessToken: response.access_token,
          userId: response.user.id
        });
      }
      return response;
    });
};

export const logout = async () => {
  window.localStorage.clear();
};
