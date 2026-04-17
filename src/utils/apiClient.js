import axios from 'axios';
import { getAdminToken } from './auth';

const api = axios.create({
  baseURL: 'https://aipromptgenerator.oxmite.com',
  // baseURL: 'http://localhost:8000',
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? getAdminToken() : null;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
