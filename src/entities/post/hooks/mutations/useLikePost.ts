import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/shared/lib';

import { likePost } from '../../api/likePost';
import { unlikePost } from '../../api/unlikePost';

export const useLikePost = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (nextHearted: boolean) => (nextHearted ? likePost(postId) : unlikePost(postId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.post(postId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
      // Note: userPosts invalidation might need accountname,
      // but invalidating by prefix works for many cases
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });
};
