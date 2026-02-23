import { useQuery } from '@tanstack/react-query';

import { getPosts } from '../api/getPosts';

export const useGetPosts = (limit?: number) => {
  return useQuery({
    queryKey: ['posts', limit],
    queryFn: () => getPosts(limit),
    staleTime: 5 * 60 * 1000, // 5분
  });
};
