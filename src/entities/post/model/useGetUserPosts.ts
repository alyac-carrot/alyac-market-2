import { useQuery } from '@tanstack/react-query';

import { getUserPosts } from '../api/getUserPosts';

export const useGetUserPosts = (accountname?: string) => {
  return useQuery({
    queryKey: ['userPosts', accountname],
    queryFn: () => getUserPosts(accountname!),
    enabled: !!accountname,
    staleTime: 30 * 1000,
  });
};
