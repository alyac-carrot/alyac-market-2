import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/shared/lib';

import type { GetPostResponse } from '../../model/types/types';
import { likePost } from '../../api/likePost';
import { unlikePost } from '../../api/unlikePost';

export const useLikePost = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (nextHearted: boolean) => (nextHearted ? likePost(postId) : unlikePost(postId)),
    onMutate: async (nextHearted) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.post(postId) });

      const previous = queryClient.getQueryData<GetPostResponse>(queryKeys.post(postId));

      queryClient.setQueryData<GetPostResponse>(queryKeys.post(postId), (old) => {
        if (!old) return old;

        return {
          ...old,
          post: {
            ...old.post,
            hearted: nextHearted,
            heartCount: nextHearted
              ? old.post.heartCount + 1
              : Math.max(0, old.post.heartCount - 1),
          },
        };
      });

      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(queryKeys.post(postId), ctx.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.post(postId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });
};
