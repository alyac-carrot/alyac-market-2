import axiosInstance from '@/shared/api/axios';

import type { MyInfoResponse } from '../model/types';

// 내 정보
export const getMyInfo = () => axiosInstance.get<MyInfoResponse>('/user/myinfo');

// 검색
export const searchUsers = (keyword: string) =>
  axiosInstance.get('/user/search', {
    params: { keyword },
  });
