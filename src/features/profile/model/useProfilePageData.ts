import { useMemo, useState } from 'react';

import { useDeletePost, useGetUserPosts } from '@/entities/post';
import { useUserProductsQuery } from '@/entities/product';
import { useFollowMutation, useProfileQuery } from '@/entities/profile';
import { useMeQuery } from '@/entities/user';
import { pickFirstImage, toImageUrl } from '@/shared/lib/';
import { type Post, type PostViewMode, type Product, type Profile } from '@/widgets/profile';

interface UseProfilePageDataProps {
  targetAccountname?: string;
  isMeByRoute: boolean;
}

export function useProfilePageData({ targetAccountname, isMeByRoute }: UseProfilePageDataProps) {
  const meQuery = useMeQuery();

  const actualAccountname = targetAccountname ?? meQuery.data?.user.accountname;

  const profileQuery = useProfileQuery(actualAccountname);
  const followMutation = useFollowMutation(actualAccountname ?? '');
  const productsQuery = useUserProductsQuery(actualAccountname);
  const userPostsQuery = useGetUserPosts(actualAccountname);
  const deletePostMutation = useDeletePost();

  const [postViewMode, setPostViewMode] = useState<PostViewMode>('normal');
  const [deleteTargetPostId, setDeleteTargetPostId] = useState<string | null>(null);

  const profile: Profile | null = useMemo(() => {
    const p = profileQuery.data;
    if (!p) return null;

    return {
      id: p.accountname,
      nickname: p.username,
      handle: `@${p.accountname}`,
      bio: p.intro ?? '',
      avatarUrl: p.image?.trim() ? toImageUrl(p.image) : '',
      followersCount: p.followerCount ?? 0,
      followingsCount: p.followingCount ?? 0,
    };
  }, [profileQuery.data]);

  const isMe = useMemo(() => {
    const meAccount = meQuery.data?.user.accountname;
    if (!meAccount || !targetAccountname) return isMeByRoute;
    return meAccount === targetAccountname;
  }, [isMeByRoute, meQuery.data?.user.accountname, targetAccountname]);

  const isFollowing = !!profileQuery.data?.isfollow;

  const sellingProducts: Product[] = useMemo(() => {
    const arr = productsQuery.data ?? [];
    return arr.map((p) => ({
      id: p.id,
      title: p.itemName,
      price: p.price,
      thumbnailUrl: toImageUrl(p.itemImage),
    }));
  }, [productsQuery.data]);

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

  const isLoading =
    meQuery.isLoading ||
    profileQuery.isLoading ||
    productsQuery.isLoading ||
    userPostsQuery.isLoading;

  return {
    // Data
    profile,
    sellingProducts,
    posts,
    postViewMode,
    deleteTargetPostId,
    // Flags
    isMe,
    isFollowing,
    isLoading,
    isError: profileQuery.isError,
    // Mutations
    deletePostMutation,
    followMutation,
    // Setters
    setPostViewMode,
    setDeleteTargetPostId,
  };
}
