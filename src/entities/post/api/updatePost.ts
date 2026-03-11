import axiosInstance from '@/shared/api/axios';

import type { CreatePostRequest, GetPostResponse } from '../model/types/types';

export const updatePost = async (
  postId: string,
  data: CreatePostRequest,
): Promise<GetPostResponse> => {
  const response = await axiosInstance.put(`/post/${postId}`, {
    post: {
      content: data.content,
      image: data.image,
    },
  });
  return response.data;
};
