import axiosInstance from '@/shared/api/axios';

import type { GetPostResponse } from '../model/types/types';

export const getPostById = async (postId: string): Promise<GetPostResponse> => {
  const response = await axiosInstance.get(`/post/${postId}`);
  return response.data;
};
