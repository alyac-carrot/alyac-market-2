import axiosInstance from '@/shared/api/axios';

import type { GetPostsResponse } from '../model/types';

export const getPostsList = async (limit?: number): Promise<GetPostsResponse> => {
  const params = limit ? { limit } : {};
  const response = await axiosInstance.get('/post', { params });
  return response.data;
};
