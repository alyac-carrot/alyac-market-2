import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createComment } from '../api/createComment';

export const useCreateComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      // 캐시 업데이트 (해당 포스트의 댓글 목록 새로고침)
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });
};
