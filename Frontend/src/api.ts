import axios from 'axios';
import BACKEND_URL from './config';

const api = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers['token'] = token;
  }
  
  if (!(config.data instanceof FormData) && !config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }
  
  return config;
});

export default api;
