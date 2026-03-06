import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { getPostsList } from '@/entities/post/api/getPostsList';
import type { Post } from '@/entities/post/model/types';
import { Button } from '@/shared/ui';

//  env에서 서버 주소
const FILE_BASE_URL = (import.meta.env.VITE_BASE_URL as string)?.replace(/\/$/, '');

// 서버 실제 응답 형태
type GetPostsResponseFromServer = {
  posts: Post[];
};

// 이미지 경로 변환
const getImageSrc = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${FILE_BASE_URL}/${path.replace(/^\//, '')}`;
};

export default function FeedPage() {
  const nav = useNavigate();

  const { data, isLoading, isError } = useQuery<GetPostsResponseFromServer>({
    queryKey: ['posts', 'list', 10],
    queryFn: () => getPostsList(10) as unknown as Promise<GetPostsResponseFromServer>,
    staleTime: 3000,
  });

  const posts = data?.posts ?? [];

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-56px-72px)] items-center justify-center text-sm text-zinc-400">
        불러오는 중...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[calc(100vh-56px-72px)] items-center justify-center text-sm text-red-500">
        피드 로드 실패
      </div>
    );
  }

  // 게시글 없을 때
  if (posts.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-56px-72px)] items-center justify-center">
        <div className="flex -translate-y-8 flex-col items-center gap-4">
          <img src="/mascot.png" alt="마스코트" className="h-auto w-[190px]" />
          <p className="text-foreground text-sm">유저를 검색해 팔로우 해보세요!</p>

          <Button
            className="rounded-full px-10 py-6 text-base font-semibold"
            onClick={() => nav('/search')}
          >
            검색하기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pt-3 pb-24">
      <ul className="space-y-6">
        {posts.map((p) => (
          <li key={p.id} className="rounded-2xl bg-white shadow-sm">
            {/* 작성자 */}
            <div className="flex items-center gap-3 px-3 pt-3">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-zinc-200">
                {p.author.image ? (
                  <img
                    src={getImageSrc(p.author.image)}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>

              <div className="min-w-0">
                <div className="text-sm font-semibold text-zinc-900">{p.author.username}</div>
                <div className="text-xs text-zinc-500">@{p.author.accountname}</div>
              </div>
            </div>

            {/* 본문 */}
            {p.content ? (
              <p className="px-3 pt-2 text-sm whitespace-pre-wrap text-zinc-900">{p.content}</p>
            ) : null}

            {/* ⭐ 정사각형 이미지 */}
            {p.image ? (
              <div className="mt-3 px-3">
                <div className="aspect-square overflow-hidden rounded-2xl bg-zinc-100">
                  <img
                    src={getImageSrc(p.image)}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            ) : null}

            {/* 하단 정보 */}
            <div className="flex items-center gap-4 px-3 pt-3 pb-3 text-xs text-zinc-500">
              <span>♥ {p.heartCount}</span>
              <span>💬 {p.commentCount}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
