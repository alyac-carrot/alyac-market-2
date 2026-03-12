import axiosInstance from '@/shared/api/axios';

import type { GetPostResponse } from '../model/types/types';

export const unlikePost = async (postId: string): Promise<GetPostResponse> => {
  const response = await axiosInstance.delete(`/post/${postId}/unheart`);
  return response.data;
};
