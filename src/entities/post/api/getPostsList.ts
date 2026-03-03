import axiosInstance from '@/shared/api/axios';

import type { GetPostResponse } from '../model/types';

export const getPostsList = async (limit?: number): Promise<GetPostResponse> => {
  const params = limit ? { limit } : {};
  const response = await axiosInstance.get('/post', { params });
  return response.data;
};
