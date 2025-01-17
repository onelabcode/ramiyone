import axios from 'axios';
import useAuthStore from '../store/AuthState';

export const axiosB = axios.create({
  baseURL:process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, 
});


var refreshPromise = null;

axiosB.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      try {
        if (!refreshPromise) {
          refreshPromise = useAuthStore.getState().refreshToken();
        }
        await refreshPromise;

        refreshPromise = null;

        return axiosB(originalRequest);
      } catch (refreshError) {

        refreshPromise = null;
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
