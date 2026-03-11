import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/shared/lib';
import type { GetPostResponse } from '../../model/types/types';

import { likePost } from '../../api/likePost';
import { unlikePost } from '../../api/unlikePost';

export const useLikePost = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (nextHearted: boolean) => (nextHearted ? likePost(postId) : unlikePost(postId)),
    // ── Optimistic update ─────────────────────────────────────────────────
    onMutate: async (nextHearted) => {
      // Cancel any in-flight refetches so they don't overwrite our optimistic data
      await queryClient.cancelQueries({ queryKey: queryKeys.post(postId) });

      // Snapshot previous value for rollback
      const previous = queryClient.getQueryData<GetPostResponse>(queryKeys.post(postId));

      // Optimistically apply the requested state
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
    // ── Roll back if the mutation fails ───────────────────────────────────
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(queryKeys.post(postId), ctx.previous);
      }
    },
    // ── Always sync with server truth ─────────────────────────────────────
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.post(postId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });
};
