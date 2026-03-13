import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '@/shared/lib';

import { getFollowings } from '../../api/followsApi';

export function useFollowingsQuery(accountname?: string, limit = 10) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.followings(accountname ?? ''), limit],
    queryFn: ({ pageParam }) => getFollowings(accountname!, limit, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.following.length < limit) return undefined;
      return allPages.reduce((total, page) => total + page.following.length, 0);
    },
    enabled: !!accountname,
    staleTime: 1000 * 30,
    retry: false,
  });
}
