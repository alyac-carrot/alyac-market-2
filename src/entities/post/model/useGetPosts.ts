import { useQuery } from '@tanstack/react-query';

import { getPostsList } from '../api/getPostsList';

export const useGetPosts = (limit?: number) => {
  return useQuery({
    queryKey: ['posts', limit],
    queryFn: () => getPostsList(limit),
  });
};
