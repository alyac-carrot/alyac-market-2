import { useQuery } from '@tanstack/react-query';

import { getPost } from '../api/getPost';

export const useGetPost = (postId: string) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost(postId),
  });
};
