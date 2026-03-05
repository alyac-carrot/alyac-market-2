import axiosInstance from '@/shared/api/axios';

export const deleteComment = async ({
  postId,
  commentId,
}: {
  postId: string;
  commentId: string;
}): Promise<void> => {
  await axiosInstance.delete(`/post/${postId}/comments/${commentId}`);
};
