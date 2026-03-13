import { useMemo, useState } from 'react';

import { useDeletePost, useGetUserPosts, useLikePostMutation } from '@/entities/post';
import type { Post } from '@/entities/profile';
import { pickFirstImage, toImageUrl } from '@/shared/lib/';

const PROFILE_POSTS_PAGE_SIZE = 10;

export function useProfilePosts(accountname?: string) {
  const userPostsQuery = useGetUserPosts(accountname, PROFILE_POSTS_PAGE_SIZE);
  const deletePostMutation = useDeletePost();
  const likePostMutation = useLikePostMutation();
  const [optimisticLikes, setOptimisticLikes] = useState<
    Record<string, { liked: boolean; likeCount: number }>
  >({});

  const rawPosts: Post[] = useMemo(() => {
    const arr = userPostsQuery.data?.pages.flatMap((page) => page.post) ?? [];
    return arr.map((p) => ({
      id: p.id,
      content: p.content,
      imageUrl: toImageUrl(pickFirstImage(p.image)),
      likeCount: p.heartCount ?? 0,
      liked: !!p.hearted,
      commentCount: p.commentCount ?? 0,
    }));
  }, [userPostsQuery.data]);

  const posts: Post[] = useMemo(() => {
    return rawPosts.map((post) => {
      const optimistic = optimisticLikes[post.id];
      if (!optimistic) return post;

      return {
        ...post,
        liked: optimistic.liked,
        likeCount: optimistic.likeCount,
      };
    });
  }, [optimisticLikes, rawPosts]);

  const fetchNextPosts = () => {
    if (!userPostsQuery.hasNextPage || userPostsQuery.isFetchingNextPage) return;
    userPostsQuery.fetchNextPage();
  };

  const togglePostLike = (postId: string) => {
    const target = posts.find((p) => p.id === postId);
    if (!target) return;

    const previous = { liked: target.liked, likeCount: target.likeCount };
    const nextLiked = !target.liked;
    const nextLikeCount = Math.max(0, target.likeCount + (nextLiked ? 1 : -1));

    setOptimisticLikes((prev) => ({
      ...prev,
      [postId]: { liked: nextLiked, likeCount: nextLikeCount },
    }));

    likePostMutation.mutate(
      { postId, nextHearted: nextLiked },
      {
        onSuccess: (data) => {
          const post = data.post;
          setOptimisticLikes((prev) => ({
            ...prev,
            [postId]: { liked: !!post.hearted, likeCount: post.heartCount ?? 0 },
          }));
        },
        onError: () => {
          setOptimisticLikes((prev) => ({
            ...prev,
            [postId]: previous,
          }));
        },
      },
    );
  };

  return {
    userPostsQuery,
    deletePostMutation,
    togglePostLike,
    likePostMutation,
    posts,
    hasNextPage: userPostsQuery.hasNextPage,
    isFetchingNextPage: userPostsQuery.isFetchingNextPage,
    fetchNextPosts,
  };
}
