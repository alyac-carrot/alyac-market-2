import axiosInstance from '@/shared/api/axios';

import type { GetPostsResponse } from '../model/types/types';

export const getPostsList = async (limit?: number): Promise<GetPostsResponse> => {
  const params = limit ? { limit, _t: Date.now() } : { _t: Date.now() }; // ✅ 추가
  const response = await axiosInstance.get('/post', { params });
  return response.data;
};
