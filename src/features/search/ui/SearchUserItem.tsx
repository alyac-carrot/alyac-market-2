import { memo } from 'react';

import type { UserItem } from '@/entities/user';
import { toImageUrl } from '@/shared/lib';
import { Avatar } from '@/shared/ui';

export const SearchUserItem = memo(({ user, onClick }: { user: UserItem; onClick: () => void }) => (
  <li
    className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-zinc-50 active:bg-zinc-50"
    onClick={onClick}
  >
    <Avatar src={toImageUrl(user.image)} alt={user.name} className="h-10 w-10" />

    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2">
        <p className="truncate text-sm font-semibold text-zinc-900">{user.name}</p>

        <span className="rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-600">
          {user.tag}
        </span>
      </div>

      <p className="truncate text-xs text-zinc-500">{user.handle}</p>
    </div>
  </li>
));

SearchUserItem.displayName = 'SearchUserItem';
