import { useQuery } from '@tanstack/react-query';

import { getToken, queryKeys } from '@/shared/lib';

import { getMyInfo } from '../../api/userApi';
import type { MyInfoResponse } from '../types/types';

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
