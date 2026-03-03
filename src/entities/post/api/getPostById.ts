import axiosInstance from '@/shared/api/axios';

import type { CreatePostResponse } from '../model/types';

export const getPostById = async (postId: string): Promise<CreatePostResponse> => {
  const response = await axiosInstance.get(`/post/${postId}`);
  return response.data;
};
