import config from '../config'
const baseUrl = config.apiUrl;

const client = async (endpoint, { body, ...customConfig } = {}) => {
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      'content-type': 'application/json',
      ...customConfig.headers
    }
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