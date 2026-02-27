import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPost } from '../api/createPost';

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // 캐시 무효화 (모든 사용자 게시글 목록 새로고침)
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });
};
