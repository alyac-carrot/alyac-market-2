import axiosInstance from '@/shared/api/axios';

import type { GetUserPostsResponse } from '../model/userPosts';

export const getUserPosts = async (accountname: string): Promise<GetUserPostsResponse> => {
  const response = await axiosInstance.get(`/post/${accountname}/userpost`);
  return response.data;
};
