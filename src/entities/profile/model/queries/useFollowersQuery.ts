import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '@/shared/lib';

import { getFollowers } from '../../api/followsApi';

export function useFollowersQuery(accountname?: string, limit = 10) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.followers(accountname ?? ''), limit],
    queryFn: ({ pageParam }) => getFollowers(accountname!, limit, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.follower.length < limit) return undefined;
      return allPages.reduce((total, page) => total + page.follower.length, 0);
    },
    enabled: !!accountname,
    staleTime: 1000 * 30,
    retry: false,
  });
}
