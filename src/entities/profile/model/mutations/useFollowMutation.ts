import { useMutation, useQueryClient } from '@tanstack/react-query';

import { followUser, unfollowUser } from '../api/profileApi';

export function useFollowMutation(accountname: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (nextFollow: boolean) => {
      if (nextFollow) {
        await followUser(accountname);
        return true;
      }
      await unfollowUser(accountname);
      return false;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
      await queryClient.invalidateQueries({ queryKey: ['followings'] });
      await queryClient.invalidateQueries({ queryKey: ['followers'] });
    },
  });
}
