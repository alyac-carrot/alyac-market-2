import { useParams } from 'react-router-dom';

import { type Profile, useFollowsPageData } from '@/features/follows';
import { Header, PageWithHeader } from '@/widgets/header';
import { FollowsListItem } from '@/widgets/profile-follows';

export default function FollowingsPage() {
  const { accountname } = useParams<{ accountname: string }>();

  const { list, isLoading, isError } = useFollowsPageData({
    accountname,
    type: 'followings',
  });

  return (
    <PageWithHeader header={<Header title="Followings" showBackButton />}>
      {isLoading && <div className="text-muted-foreground p-6 text-sm">Loading...</div>}

      {isError && <div className="text-muted-foreground p-6 text-sm">팔로잉 목록을 불러오지 못했습니다.</div>}

      {!isLoading && !isError && list.length === 0 && (
        <div className="text-muted-foreground p-6 text-sm">팔로잉이 없습니다.</div>
      )}

      {list.map((u: Profile) => (
        <FollowsListItem key={u._id} user={u} defaultFollowing />
      ))}
    </PageWithHeader>
  );
}
