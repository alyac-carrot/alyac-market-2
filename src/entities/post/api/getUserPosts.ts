import axiosInstance from '@/shared/api/axios';

import type { GetUserPostsResponse } from '../model/types/userPosts';

export const getUserPosts = async (
  accountname: string,
  limit = 10,
  skip = 0,
): Promise<GetUserPostsResponse> => {
  const response = await axiosInstance.get(`/post/${accountname}/userpost`, {
    params: { limit, skip },
  });
  return response.data;
};
