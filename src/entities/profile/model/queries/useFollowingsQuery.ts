import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/shared/lib';

import { getFollowings } from '../../api/followsApi';

export function useFollowingsQuery(accountname?: string, limit = 10, skip = 0) {
  return useQuery({
    queryKey: [...queryKeys.followings(accountname ?? ''), limit, skip],
    queryFn: () => getFollowings(accountname!, limit, skip),
    enabled: !!accountname,
    staleTime: 1000 * 30,
    retry: false,
  });
}
