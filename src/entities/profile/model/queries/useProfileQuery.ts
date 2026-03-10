import { useQuery } from '@tanstack/react-query';

import { getProfile } from '../../api/profileApi';
import { profileQueryKeys } from '../queries/queries';

export function useProfileQuery(accountname?: string) {
  return useQuery({
    queryKey: accountname ? profileQueryKeys.profile(accountname) : ['profile', 'disabled'],
    queryFn: async () => (await getProfile(accountname!)).profile,
    enabled: !!accountname,
    staleTime: 1000 * 30,
    retry: false,
  });
}
