import axiosInstance from '@/shared/api/axios';

import type { CreateCommentRequest, CreateCommentResponse } from '../model/comment';

export const createComment = async (data: CreateCommentRequest): Promise<CreateCommentResponse> => {
  const response = await axiosInstance.post(`/post/${data.postId}/comments`, {
    comment: {
      content: data.content,
    },
  });
  return response.data;
};
