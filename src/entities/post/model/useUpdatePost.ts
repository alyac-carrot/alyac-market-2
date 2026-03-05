import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updatePost } from '../api/updatePost';

export const useUpdatePost = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { content: string; image?: string }) => updatePost(postId, data),
    onSuccess: () => {
      // 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });
};
