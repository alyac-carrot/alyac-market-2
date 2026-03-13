import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '@/shared/lib/queryKeys';

import { getUserPosts } from '../../api/getUserPosts';

export const useGetUserPosts = (accountname?: string, limit = 10) => {
  return useInfiniteQuery({
    queryKey: [...queryKeys.userPosts(accountname ?? ''), limit],
    queryFn: ({ pageParam }) => getUserPosts(accountname!, limit, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.post.length < limit) return undefined;

      return allPages.reduce((total, page) => total + page.post.length, 0);
    },
    enabled: !!accountname,
    staleTime: 30 * 1000,
  });
};
