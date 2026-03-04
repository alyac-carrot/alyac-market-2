import axiosInstance from '@/shared/api/axios';

import type {
  CreateCommentRequest,
  CreateCommentResponse,
  GetCommentsRequest,
  GetCommentsResponse,
} from '../model/comment';

export const createComment = async (data: CreateCommentRequest): Promise<CreateCommentResponse> => {
  const response = await axiosInstance.post(`/post/${data.postId}/comments`, {
    comment: {
      content: data.content,
    },
  });
  return response.data;
};

export const getComments = async (data: GetCommentsRequest): Promise<GetCommentsResponse> => {
  const response = await axiosInstance.get(`/post/${data.postId}/comments`);
  return response.data;
};

export const deleteComment = async ({
  postId,
  commentId,
}: {
  postId: string;
  commentId: string;
}): Promise<void> => {
  await axiosInstance.delete(`/post/${postId}/comments/${commentId}`);
};

export const editComment = async ({
  postId,
  commentId,
  content,
}: {
  postId: string;
  commentId: string;
  content: string;
}): Promise<void> => {
  await axiosInstance.put(`/post/${postId}/comments/${commentId}`, {
    comment: { content },
  });
};
