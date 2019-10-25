import config from '../config'
import { getAuthToken } from './auth-client';
const baseUrl = config.apiUrl;

const client = async (endpoint, { body, ...customConfig } = {}) => {
  const headers = {
    'content-type': 'application/json',
    ...customConfig.headers
  };

  const token = getAuthToken();
  if (token && token.accessToken) {
    headers.authorization = `bearer ${token.accessToken}`;
  }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers
  }

  if (body) {
    config.body = JSON.stringify(body);
  }

  const result = await window.fetch(`${baseUrl}${endpoint}`, config);
  if (result.status === 204) return;
  if (result.status > 300) {
    return Promise.reject(new Error(result.statusText));
  }
  return result.json();
};

export default client;