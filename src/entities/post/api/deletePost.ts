import axiosInstance from '@/shared/api/axios';

export const deletePost = async (postId: string): Promise<void> => {
  await axiosInstance.delete(`/post/${postId}`);
};
