import axiosInstance from '@/shared/api/axios';

import type { GetPostsResponse } from '../model/types/types';

export const getFeedPosts = async (limit?: number): Promise<GetPostsResponse> => {
  const params = limit ? { limit, _t: Date.now() } : { _t: Date.now() };
  const response = await axiosInstance.get('/post/feed', { params });
  return response.data;
};
