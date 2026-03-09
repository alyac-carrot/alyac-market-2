import { useMemo } from 'react';

import { useDeletePost, useGetUserPosts } from '@/entities/post';
import type { Post } from '@/entities/profile';
import { pickFirstImage, toImageUrl } from '@/shared/lib/';

export function useProfilePosts(accountname?: string) {
  const userPostsQuery = useGetUserPosts(accountname);
  const deletePostMutation = useDeletePost();

  const posts: Post[] = useMemo(() => {
    const arr = userPostsQuery.data?.post ?? [];
    return arr.map((p) => ({
      id: p.id,
      content: p.content,
      imageUrl: toImageUrl(pickFirstImage(p.image)),
      likeCount: p.heartCount ?? 0,
      commentCount: p.commentCount ?? 0,
    }));
  }, [userPostsQuery.data]);

  return {
    userPostsQuery,
    deletePostMutation,
    posts,
  };
}
