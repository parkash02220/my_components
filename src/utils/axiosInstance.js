import axios from 'axios';
import { getAuthTokenFromCookies } from '.';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined'
      ? getAuthTokenFromCookies()
      : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized — maybe logout user here.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
