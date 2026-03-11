import { useQuery } from '@tanstack/react-query';

import { getToken } from '@/entities/auth/lib/token';
import { queryKeys } from '@/shared/lib';

import { getMyInfo } from '../../api/userApi';
import type { MyInfoResponse } from '../types/types';

export function useMeQuery() {
  const hasToken = !!getToken();

  return useQuery<MyInfoResponse>({
    queryKey: queryKeys.me,
    queryFn: () => getMyInfo(),
    enabled: hasToken,
    staleTime: 1000 * 60,
    retry: false,
  });
}
