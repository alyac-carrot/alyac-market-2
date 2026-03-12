import axiosInstance from '@/shared/api/axios';

import type { GetPostsResponse } from '../model/types/types';

export const getFeedPosts = async (limit?: number): Promise<GetPostsResponse> => {
  const params = limit ? { limit } : undefined;
  const response = await axiosInstance.get('/post/feed', { params });
  return response.data;
};
