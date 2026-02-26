import { useQuery } from '@tanstack/react-query';

import { type MyInfoResponse, getMyInfo } from '@/entities/auth/api/authApi';
import { getToken } from '@/entities/auth/lib/token';
import { queryKeys } from '@/shared/lib';

export function useMeQuery() {
  const hasToken = !!getToken();

  return useQuery<MyInfoResponse>({
    queryKey: queryKeys.me,
    queryFn: async () => {
      const res = await getMyInfo();
      return res.data;
    },
    enabled: hasToken,
    staleTime: 1000 * 60,
    retry: false,
  });
}
