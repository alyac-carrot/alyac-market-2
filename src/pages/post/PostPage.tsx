import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, MoreVertical } from 'lucide-react';

import { Avatar } from '@/shared/ui/Avatar';

/* ── sample data (replace with real API later) ── */
const POST = {
  avatar: '',
  userName: '이스트 시큐리티 알약',
  handle: '@ estSecurity_Alyac',
  content:
    '알려지지 않은 위협의 즉각적인 차단부터 식별, 대응까지. 10년이상의 백신 운영 노하우와 악성코드 분석 전문성을 담은 알약 EDR 솔루션은 위협 인텔리전스와의 결합으로 확장된 엔드포인트 위협 대응 체계를 제공합니다.',
  image: '',
  likes: 58,
  comments: 12,
  date: '2020년 10월 21일',
};

const COMMENTS = [
  {
    id: 1,
    avatar: '',
    userName: '이스트 소프트',
    time: '5분 전',
    text: '게시글 답글 ~~ !! 최고최고',
  },
  {
    id: 2,
    avatar: '',
    userName: '보안 백신 전문가',
    time: '15분 전',
    text: '너무 기대됩니다. 블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라...',
  },
];

/* ── single comment ── */
function CommentItem({
  avatar,
  userName,
  time,
  text,
}: {
  avatar: string;
  userName: string;
  time: string;
  text: string;
}) {
  return (
    <div className="flex gap-3 px-4 py-4">
      <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full">
        {avatar ? (
          <img src={avatar} alt={userName} className="h-full w-full object-cover" />
        ) : (
          <Avatar size="sm" />
        )}
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-foreground font-semibold">{userName}</span>
            <span className="text-muted-foreground text-xs">· {time}</span>
          </div>
          <button type="button" className="h-6 w-6">
            <MoreVertical className="text-muted-foreground h-4 w-4" />
          </button>
        </div>
        <p className="text-foreground text-left text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

/* ── main page ── */
export function PostPage() {
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');

  return (
    <div className="bg-background flex min-h-screen flex-col pb-20 text-left">
      {/* ─ sticky top nav ─ */}
      <header className="border-border bg-background sticky top-0 z-10 flex items-center justify-between border-b px-4 py-3">
        <button type="button" onClick={() => navigate(-1)} className="text-foreground hover:text-foreground/80">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <button type="button">
          <MoreVertical className="text-muted-foreground h-6 w-6" />
        </button>
      </header>

      {/* ─ scrollable main ─ */}
      <main className="flex-1 overflow-y-auto">
        {/* post article */}
        <article className="border-border border-b pb-4">
          {/* post header */}
          <div className="flex items-center gap-3 px-4 py-4">
            <Avatar src={POST.avatar || undefined} size="md" />
            <div className="flex flex-col text-left">
              <span className="text-foreground text-sm font-normal">{POST.userName}</span>
              <span className="text-muted-foreground text-xs">{POST.handle}</span>
            </div>
          </div>

          {/* post text */}
          <div className="px-4 pb-4">
            <p className="text-foreground text-left text-base leading-relaxed whitespace-pre-wrap">
              {POST.content}
            </p>
          </div>

          {/* post image */}
          {POST.image ? (
            <div className="mb-4 space-y-2 px-4">
              <img
                src={POST.image}
                alt="Post image"
                className="h-auto w-full rounded-xl object-cover"
              />
            </div>
          ) : (
            <div className="mb-4 space-y-2 px-4">
              <div className="bg-muted flex h-64 w-full items-center justify-center rounded-xl p-4 text-sm text-muted-foreground">
                이미지
              </div>
            </div>
          )}

          {/* actions */}
          <div className="flex items-center gap-4 px-4">
            <button type="button" className="flex items-center gap-1.5">
              <Heart className="text-muted-foreground h-5 w-5" strokeWidth={1.5} />
              <span className="text-muted-foreground text-xs">{POST.likes}</span>
            </button>
            <button type="button" className="flex items-center gap-1.5">
              <MessageCircle className="text-muted-foreground h-5 w-5" strokeWidth={1.5} />
              <span className="text-muted-foreground text-xs">{POST.comments}</span>
            </button>
          </div>

          {/* date */}
          <p className="text-muted-foreground mt-3 px-4 text-left text-xs">{POST.date}</p>
        </article>

        {/* comments */}
        <div className="divide-border divide-y">
          {COMMENTS.map((c) => (
            <CommentItem
              key={c.id}
              avatar={c.avatar}
              userName={c.userName}
              time={c.time}
              text={c.text}
            />
          ))}
        </div>
      </main>

      {/* ─ fixed comment input bar ─ */}
      <div className="border-border bg-background fixed right-0 bottom-0 left-0 border-t px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-300">
            <Avatar size="sm" />
          </div>
          <div className="relative flex-1">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="댓글 입력하기..."
              className="bg-muted h-10 w-full rounded-full border-none pr-12 pl-4 text-left text-sm outline-none focus-visible:ring-0"
            />
            <button
              type="button"
              className="text-muted-foreground hover:text-primary absolute top-1/2 right-2 h-8 -translate-y-1/2 text-sm font-semibold"
              disabled={!commentText.trim()}
            >
              게시
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}