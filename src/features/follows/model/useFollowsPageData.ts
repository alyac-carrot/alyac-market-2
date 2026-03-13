import { useMemo } from 'react';

import { type Profile, useFollowersQuery, useFollowingsQuery } from '@/entities/profile';

export type FollowType = 'followers' | 'followings';

interface UseFollowsPageDataProps {
  accountname?: string;
  type: FollowType;
  limit?: number;
}

export function useFollowsPageData({ accountname, type, limit = 10 }: UseFollowsPageDataProps) {
  const followersQuery = useFollowersQuery(accountname, limit);
  const followingsQuery = useFollowingsQuery(accountname, limit);

  const query = type === 'followers' ? followersQuery : followingsQuery;

  const list: Profile[] = useMemo(() => {
    return type === 'followers'
      ? (followersQuery.data?.pages.flatMap((page) => page.follower) ?? [])
      : (followingsQuery.data?.pages.flatMap((page) => page.following) ?? []);
  }, [followersQuery.data, followingsQuery.data, type]);

  const fetchNext = () => {
    if (!query.hasNextPage || query.isFetchingNextPage) return;
    query.fetchNextPage();
  };

  return {
    list,
    isLoading: query.isLoading,
    isError: query.isError,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNext,
    type,
  };
}
