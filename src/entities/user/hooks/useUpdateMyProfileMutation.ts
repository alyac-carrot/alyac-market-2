import { useMutation, useQueryClient } from '@tanstack/react-query';

import { profileQueryKeys } from '@/entities/profile/model/queries';
import { queryKeys } from '@/shared/lib';

import { updateMyProfile } from '../api/userApi';
import type { UpdateProfileBody, UpdateProfileResponse } from '../model/types';

export function useUpdateMyProfileMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (body: UpdateProfileBody) => {
      const res = await updateMyProfile(body);
      return res.data as UpdateProfileResponse;
    },

    onSuccess: async (data) => {
      const updatedUser = data.user;
      const accountname = updatedUser.accountname;

      qc.setQueryData(queryKeys.me, { user: updatedUser });

      qc.setQueryData(profileQueryKeys.profile(accountname), (prev: unknown) => {
        return {
          ...updatedUser,
          ...(typeof prev === 'object' && prev !== null ? prev : {}),
        };
      });

      await qc.invalidateQueries({ queryKey: queryKeys.me });
      await qc.invalidateQueries({ queryKey: profileQueryKeys.profile(accountname) });
    },
  });
}
