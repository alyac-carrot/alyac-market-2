import { useEffect, useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useFollowMutation } from '@/entities/profile';
import type { FollowUser } from '@/entities/profile';
import { useMeQuery } from '@/entities/user';
import { toImageUrl } from '@/shared/lib/image/Url';
import { Avatar } from '@/shared/ui';
import { Button } from '@/shared/ui';

type Props = {
  user: FollowUser;
  defaultFollowing?: boolean;
};

export function FollowsListItem({ user, defaultFollowing }: Props) {
  const navigate = useNavigate();
  const meQuery = useMeQuery();

  const initial = useMemo(() => {
    if (user.isfollow === true) return true;
    return !!defaultFollowing;
  }, [defaultFollowing, user.isfollow]);

  const [isFollowing, setIsFollowing] = useState(initial);

  useEffect(() => {
    setIsFollowing(initial);
  }, [initial]);

  const followMutation = useFollowMutation(user.accountname);
  const isSelf = meQuery.data?.user.accountname === user.accountname;
  const isButtonDisabled = followMutation.isPending || isSelf;

  return (
    <div className="flex items-center justify-between gap-3 border-b px-4 py-4">
      <button
        type="button"
        className="flex min-w-0 flex-1 items-center gap-3 text-left"
        onClick={() => navigate(`/profile/${user.accountname}`)}
      >
        <Avatar src={toImageUrl(user.image)} alt={user.username} size="sm" className="h-10 w-10" />

        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">{user.username}</div>
          <div className="text-muted-foreground truncate text-xs">{user.intro}</div>
        </div>
      </button>

      <Button
        type="button"
        variant={isFollowing ? 'outline' : 'default'}
        className={
          isFollowing
            ? 'cursor-pointer rounded-full px-6'
            : 'cursor-pointer rounded-full bg-[#6BCB26] px-6 text-white hover:bg-[#5CB020]'
        }
        disabled={isButtonDisabled}
        onClick={() => {
          if (isSelf) return;

          const next = !isFollowing;
          setIsFollowing(next);

          followMutation.mutate(next, {
            onError: (error) => {
              const message: string =
                typeof error === 'object' &&
                error !== null &&
                'response' in error &&
                typeof (error as { response?: { data?: { message?: unknown } } }).response?.data
                  ?.message === 'string'
                  ? (error as { response?: { data?: { message?: string } } }).response?.data
                      ?.message ?? ''
                  : '';

              if (next && message.includes('팔로우')) {
                setIsFollowing(true);
                return;
              }

              setIsFollowing((prev) => !prev);
            },
          });
        }}
      >
        {isSelf ? '본인' : followMutation.isPending ? '...' : isFollowing ? '취소' : '팔로우'}
      </Button>
    </div>
  );
}
