import { useMemo } from 'react';

import { type UIProfile, useFollowMutation, useProfileQuery } from '@/entities/profile';
import { useMeQuery } from '@/entities/user';
import { toImageUrl } from '@/shared/lib/';

interface UseProfileIdentityProps {
  targetAccountname?: string;
  isMeByRoute: boolean;
}

export function useProfileIdentity({ targetAccountname, isMeByRoute }: UseProfileIdentityProps) {
  const meQuery = useMeQuery();
  const actualAccountname = targetAccountname ?? meQuery.data?.user.accountname;

  const profileQuery = useProfileQuery(actualAccountname);
  const followMutation = useFollowMutation(actualAccountname ?? '');

  const profile: UIProfile | null = useMemo(() => {
    const p = profileQuery.data;
    if (!p) return null;

    return {
      id: p.accountname,
      nickname: p.username,
      handle: `@${p.accountname}`,
      bio: p.intro ?? '',
      avatarUrl: p.image?.trim() ? toImageUrl(p.image) : '',
      followersCount: p.followerCount ?? 0,
      followingsCount: p.followingCount ?? 0,
    };
  }, [profileQuery.data]);

  const isMe = useMemo(() => {
    const meAccount = meQuery.data?.user.accountname;
    if (!meAccount || !targetAccountname) return isMeByRoute;
    return meAccount === targetAccountname;
  }, [isMeByRoute, meQuery.data?.user.accountname, targetAccountname]);

  return {
    meQuery,
    profileQuery,
    followMutation,
    profile,
    isMe,
    isFollowing: !!profileQuery.data?.isfollow,
    actualAccountname,
  };
}
