import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/shared/lib';

import { getFollowers } from '../../api/followsApi';

export function useFollowersQuery(accountname?: string, limit = 10, skip = 0) {
  return useQuery({
    queryKey: [...queryKeys.followers(accountname ?? ''), limit, skip],
    queryFn: () => getFollowers(accountname!, limit, skip),
    enabled: !!accountname,
    staleTime: 1000 * 30,
    retry: false,
  });
}
