import axiosInstance from '@/shared/api/axios';

import type { CreatePostRequest, CreatePostResponse } from '../model/types';

export const updatePost = async (
  postId: string,
  data: CreatePostRequest,
): Promise<CreatePostResponse> => {
  const response = await axiosInstance.put(`/post/${postId}`, {
    post: {
      content: data.content,
      image: data.image,
    },
  });
  return response.data;
};
