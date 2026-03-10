import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { queryKeys, removeToken } from '@/shared/lib';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    removeToken();

    queryClient.removeQueries({ queryKey: queryKeys.me });

    navigate('/', { replace: true });
  };

  return logout;
}
