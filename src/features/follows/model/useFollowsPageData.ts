import { useMemo } from 'react';

import { type Profile, useFollowersQuery, useFollowingsQuery } from '@/entities/profile';
import { useMeQuery } from '@/entities/user';

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
  const meQuery = useMeQuery();
  const myAccountname = meQuery.data?.user.accountname;
  const followersQuery = useFollowersQuery(accountname, limit, skip);
  const followingsQuery = useFollowingsQuery(accountname, limit, skip);
  const myFollowingsQuery = useFollowingsQuery(myAccountname, 1000, 0);

  const query = type === 'followers' ? followersQuery : followingsQuery;

  const list: Profile[] = useMemo(() => {
    const rawList =
      type === 'followers' ? (followersQuery.data?.follower ?? []) : (followingsQuery.data?.following ?? []);

    const myFollowingAccountnames = new Set(
      (myFollowingsQuery.data?.following ?? []).map((profile) => profile.accountname),
    );

    return rawList.map((profile) => ({
      ...profile,
      isfollow: profile.isfollow === true || myFollowingAccountnames.has(profile.accountname),
    }));
  }, [followersQuery.data, followingsQuery.data, myFollowingsQuery.data, type]);

  return {
    list,
    isLoading: query.isLoading,
    isError: query.isError,
    type,
  };
}
