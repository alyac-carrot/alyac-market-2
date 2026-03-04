import { useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useFollowMutation } from '@/entities/profile';
import type { FollowUser } from '@/entities/profile';
import { toImageUrl } from '@/shared/lib/image/Url';
import { Avatar } from '@/shared/ui';
import { Button } from '@/shared/ui';

type Props = {
  user: FollowUser;
  defaultFollowing?: boolean;
};

export function FollowsListItem({ user, defaultFollowing }: Props) {
  const navigate = useNavigate();

  const initial = useMemo(() => {
    if (typeof user.isfollow === 'boolean') return user.isfollow;
    return !!defaultFollowing;
  }, [defaultFollowing, user.isfollow]);

  const [isFollowing, setIsFollowing] = useState(initial);

  const followMutation = useFollowMutation(user.accountname);

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
            ? 'rounded-full px-6'
            : 'rounded-full bg-[#6BCB26] px-6 text-white hover:bg-[#5CB020]'
        }
        disabled={followMutation.isPending}
        onClick={() => {
          const next = !isFollowing;
          setIsFollowing(next);

          followMutation.mutate(next, {
            onError: () => setIsFollowing((prev) => !prev),
          });
        }}
      >
        {followMutation.isPending ? '...' : isFollowing ? '취소' : '팔로우'}
      </Button>
    </div>
  );
}
