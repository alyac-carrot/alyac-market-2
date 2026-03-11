import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/shared/lib';

import { likePost } from '../../api/likePost';
import { unlikePost } from '../../api/unlikePost';

interface ToggleLikePayload {
  postId: string;
  nextHearted: boolean;
}

export function useLikePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, nextHearted }: ToggleLikePayload) =>
      nextHearted ? likePost(postId) : unlikePost(postId),
    onSuccess: (_data, { postId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.post(postId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });
}
