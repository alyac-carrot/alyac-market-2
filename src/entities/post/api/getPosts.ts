import axiosInstance from '@/shared/api/axios';

import type { GetPostsResponse } from '../model/types';

export const getPosts = async (limit?: number): Promise<GetPostsResponse> => {
  const params = limit ? { limit } : {};
  const response = await axiosInstance.get('/post', { params });
  return response.data;
};
