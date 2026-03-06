import axiosInstance from '@/shared/api/axios';

import type { GetPostResponse } from '../model/types/types';

export const likePost = async (postId: string): Promise<GetPostResponse> => {
  const response = await axiosInstance.post(`/post/${postId}/heart`);
  return response.data;
};
