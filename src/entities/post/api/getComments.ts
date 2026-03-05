import axiosInstance from '@/shared/api/axios';

import type { GetCommentsRequest, GetCommentsResponse } from '../model/comment';

export const getComments = async (data: GetCommentsRequest): Promise<GetCommentsResponse> => {
  const response = await axiosInstance.get(`/post/${data.postId}/comments`);
  return response.data;
};
