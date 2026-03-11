import { useQuery } from '@tanstack/react-query';

import { getFeedPosts } from '../../api/getFeedposts';

export const useGetFeedPosts = (limit?: number) => {
  return useQuery({
    queryKey: ['posts', 'feed', limit],
    queryFn: () => getFeedPosts(limit),
  });
};
