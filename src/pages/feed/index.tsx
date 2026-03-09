import { Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { useGetPosts } from '@/entities/post';
import { toImageUrl } from '@/shared/lib';
import { Avatar, Button } from '@/shared/ui';
import { PageWithFooter } from '@/widgets/footer';
import { Header, PageWithHeader } from '@/widgets/header';

export default function FeedPage() {
  const nav = useNavigate();

  const { data, isLoading, isError } = useGetPosts(10);

  const posts = data?.posts ?? [];

  if (isLoading) {
    return (
      <PageWithFooter>
        <div className="flex min-h-[calc(100vh-56px-72px)] items-center justify-center text-sm text-zinc-400">
          불러오는 중...
        </div>
      </PageWithFooter>
    );
  }

  if (isError) {
    return (
      <PageWithFooter>
        <div className="flex min-h-[calc(100vh-56px-72px)] items-center justify-center text-sm text-red-500">
          피드 로드 실패
        </div>
      </PageWithFooter>
    );
  }

  if (posts.length === 0) {
    return (
      <PageWithFooter>
        <div className="flex min-h-[calc(100vh-56px-72px)] items-center justify-center">
          <div className="flex -translate-y-8 flex-col items-center gap-4">
            <img src="/mascot.png" alt="마스코트" className="h-auto w-[190px]" />
            <p className="text-foreground text-sm">유저를 검색해 팔로우해보세요!</p>

            <Button
              className="rounded-full px-10 py-6 text-base font-semibold"
              onClick={() => nav('/search')}
            >
              검색하기
            </Button>
          </div>
        </div>
      </PageWithFooter>
    );
  }

  return (
    <PageWithFooter>
      <PageWithHeader
        header={
          <Header
            center={
              <Link to="/feed" className="text-lg font-bold">
                알약마켓 피드
              </Link>
            }
            right={
              <Button asChild variant="ghost" size="icon" aria-label="검색" className="h-12 w-12">
                <Link to="/search">
                  <Search className="h-6 w-6" />
                </Link>
              </Button>
            }
          />
        }
        contentClassName="mx-auto max-w-3xl px-4 pb-24"
        headerOffsetClassName="pt-20"
      >
        <ul className="space-y-6">
          {posts.map((p) => (
            <li
              key={p.id}
              className="rounded-2xl bg-white shadow-sm dark:border dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center gap-3 px-3 pt-3">
                <Avatar src={toImageUrl(p.author.image)} alt={p.author.username} className="h-10 w-10" />

                <div className="min-w-0">
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {p.author.username}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">@{p.author.accountname}</div>
                </div>
              </div>

              {p.content ? (
                <p className="px-3 pt-2 text-sm whitespace-pre-wrap text-zinc-900 dark:text-zinc-100">
                  {p.content}
                </p>
              ) : null}

              {p.image ? (
                <div className="mt-3 px-3">
                  <div className="aspect-square overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                    <img src={toImageUrl(p.image)} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </div>
                </div>
              ) : null}

              <div className="flex items-center gap-4 px-3 pt-3 pb-3 text-xs text-zinc-500 dark:text-zinc-400">
                <span>좋아요 {p.heartCount}</span>
                <span>댓글 {p.commentCount}</span>
              </div>
            </li>
          ))}
        </ul>
      </PageWithHeader>
    </PageWithFooter>
  );
}
