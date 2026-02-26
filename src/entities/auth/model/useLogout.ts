import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { removeToken } from '@/entities/auth/lib/token';
import { queryKeys } from '@/shared/lib';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    // 1️⃣ 토큰 삭제
    removeToken();

    // 2️⃣ me 캐시 제거
    queryClient.removeQueries({ queryKey: queryKeys.me });

    // 3️⃣ 로그인 페이지 이동
    navigate('/', { replace: true });
  };

  return logout;
}
