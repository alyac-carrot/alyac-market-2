import { useMutation, useQueryClient } from '@tanstack/react-query';

import { followUser, unfollowUser } from '../api/profileApi';
import { profileQueryKeys } from '../model/queries/queries';

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
      await queryClient.invalidateQueries({ queryKey: profileQueryKeys.all });
      await queryClient.invalidateQueries({ queryKey: profileQueryKeys.followings });
      await queryClient.invalidateQueries({ queryKey: profileQueryKeys.followers });
    },
  });
}
