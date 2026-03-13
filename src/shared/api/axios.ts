import axios from 'axios';

import { getRefreshToken, getToken, removeToken, saveToken } from '@/entities/auth/lib/token';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api`;
const signInPath = `${import.meta.env.BASE_URL}auth/signin`;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

// 요청 인터셉터: 토큰 자동 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터: 401 처리 및 토큰 갱신
let isRefreshing = false;
let refreshSubscribers: {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}[] = [];

const subscribeTokenRefresh = (
  resolve: (token: string) => void,
  reject: (err: unknown) => void,
) => {
  refreshSubscribers.push({ resolve, reject });
};

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((sub) => sub.resolve(token));
  refreshSubscribers = [];
};

const onTokenRefreshFailed = (error: unknown) => {
  refreshSubscribers.forEach((sub) => sub.reject(error));
  refreshSubscribers = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러 && 재시도 안한 요청
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 이미 갱신 중이면 대기
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh(
            (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            },
            (err) => {
              reject(err);
            },
          );
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        // Refresh token 없으면 로그아웃
        removeToken();
        window.location.href = signInPath;
        return Promise.reject(error);
      }

      try {
        // Refresh token으로 새 토큰 요청
        const response = await axios.post(
          `${API_URL}/user/refresh`,
          { refreshToken },
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );

        const { accessToken: newToken, refreshToken: newRefreshToken } = response.data;
        saveToken(newToken, newRefreshToken);

        // 대기 중인 요청들에 새 토큰 전달
        onTokenRefreshed(newToken);

        // 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh 실패 시 로그아웃 및 대기 중인 요청들 취소
        onTokenRefreshFailed(refreshError);
        removeToken();
        window.location.href = signInPath;
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
