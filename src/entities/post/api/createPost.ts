import axiosInstance from '@/shared/api/axios';

import type { CreatePostRequest, CreatePostResponse } from '../model/types';

export const createPost = async (data: CreatePostRequest): Promise<CreatePostResponse> => {
  const response = await axiosInstance.post('/post', {
    post: {
      content: data.content,
      image: data.image,
    },
  });
  return response.data;
};
