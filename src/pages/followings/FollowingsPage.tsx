import { useMemo } from 'react';

import { useParams } from 'react-router-dom';

import { useFollowingsQuery } from '@/entities/profile';
import { FollowsListItem } from '@/widgets/profile-follows';

export default function FollowingsPage() {
  const { accountname } = useParams<{ accountname: string }>();

  const query = useFollowingsQuery(accountname, 10, 0);
  const list = useMemo(() => query.data?.following ?? [], [query.data]);

  return (
    <div>
      {query.isLoading && <div className="text-muted-foreground p-6 text-sm">Loading...</div>}

      {query.isError && (
        <div className="text-muted-foreground p-6 text-sm">팔로잉 목록을 불러오지 못했습니다.</div>
      )}

      {!query.isLoading && !query.isError && list.length === 0 && (
        <div className="text-muted-foreground p-6 text-sm">팔로잉이 없습니다.</div>
      )}

      {list.map((u) => (
        <FollowsListItem key={u._id} user={u} defaultFollowing />
      ))}
    </div>
  );
}
