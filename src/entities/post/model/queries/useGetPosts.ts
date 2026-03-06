import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/lib';
import { getPostsList } from '../../api/getPostsList';

export const useGetPosts = (limit?: number) => {
  return useQuery({
    queryKey: limit ? [...queryKeys.posts, limit] : queryKeys.posts,
    queryFn: () => getPostsList(limit),
    staleTime: 5 * 60 * 1000, // ✅ 5분 캐시 (불필요한 리로드 감소)
  });
};
