import { useMemo } from 'react';

import { type Profile, useFollowersQuery, useFollowingsQuery } from '@/entities/profile';

export type FollowType = 'followers' | 'followings';

interface UseFollowsPageDataProps {
  accountname?: string;
  type: FollowType;
  limit?: number;
  skip?: number;
}

export function useFollowsPageData({
  accountname,
  type,
  limit = 10,
  skip = 0,
}: UseFollowsPageDataProps) {
  const followersQuery = useFollowersQuery(accountname, limit, skip);
  const followingsQuery = useFollowingsQuery(accountname, limit, skip);

  const query = type === 'followers' ? followersQuery : followingsQuery;

  const list: Profile[] = useMemo(() => {
    if (type === 'followers') {
      return followersQuery.data?.follower ?? [];
    }
    return followingsQuery.data?.following ?? [];
  }, [followersQuery.data, followingsQuery.data, type]);

  return {
    list,
    isLoading: query.isLoading,
    isError: query.isError,
    type,
  };
}
