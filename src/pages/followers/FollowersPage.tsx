import { useParams } from 'react-router-dom';

import { type Profile, useFollowsPageData } from '@/features/follows';
import { useInfiniteScroll } from '@/shared/lib';
import { PageWithFooter } from '@/widgets/footer';
import { Header, PageWithHeader } from '@/widgets/header';
import { FollowsListItem } from '@/widgets/profile-follows';

export default function FollowersPage() {
  const { accountname } = useParams<{ accountname: string }>();

  const { list, isLoading, isError, hasNextPage, isFetchingNextPage, fetchNext } = useFollowsPageData({
    accountname,
    type: 'followers',
  });
  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetching: isFetchingNextPage,
    onLoadMore: fetchNext,
  });

  return (
    <PageWithFooter>
      <PageWithHeader header={<Header title="Followers" showBackButton />}>
        {isLoading && <div className="text-muted-foreground p-6 text-sm">Loading...</div>}

        {isError && (
          <div className="text-muted-foreground p-6 text-sm">
            팔로워 목록을 불러오지 못했습니다.
          </div>
        )}

        {!isLoading && !isError && list.length === 0 && (
          <div className="text-muted-foreground p-6 text-sm">팔로워가 없습니다.</div>
        )}

        {list.map((u: Profile) => (
          <FollowsListItem key={u._id} user={u} />
        ))}

        {(hasNextPage || isFetchingNextPage) && (
          <div ref={loadMoreRef} className="text-muted-foreground p-6 text-center text-sm">
            {isFetchingNextPage ? '목록 불러오는 중...' : '아래로 스크롤하면 더 불러옵니다.'}
          </div>
        )}
      </PageWithHeader>
    </PageWithFooter>
  );
}
