import { useState } from 'react';

import { ArrowLeft, Heart, MessageCircle, MoreVertical } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetPost } from '@/entities/post/hooks/useGetPost';
import { useCreateComment, useGetComments } from '@/entities/post/hooks/useComments';
import { pickFirstImage, toImageUrl } from '@/shared/lib';
import { Avatar } from '@/shared/ui/Avatar';

import type { Comment } from '@/entities/post/model/comment';

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

/* ── format date ── */
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/* ── main page ── */
export default function PostPage() {
  const navigate = useNavigate();
  const { postId = '' } = useParams();
  const [commentText, setCommentText] = useState('');

  // Fetch post data
  const { data: postData, isLoading: isLoadingPost, isError } = useGetPost(postId);

  // Fetch comments for this post
  const { data: commentsData, isLoading: isLoadingComments } = useGetComments(postId);
  const { mutate: submitComment, isPending: isSubmitting } = useCreateComment(postId);

  const comments: Comment[] = commentsData?.comments ?? [];

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;

    submitComment(
      { content: commentText, postId },
      {
        onSuccess: () => {
          setCommentText('');
        },
      },
    );
  };

  if (isLoadingPost) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (isError || !postData?.post) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-sm text-gray-500">게시글을 불러오지 못했습니다.</p>
      </div>
    );
  }

  const post = postData.post;
  const authorAvatar = post.author?.image ? toImageUrl(post.author.image) : '';
  const postImage = toImageUrl(pickFirstImage(post.image));

  return (
    <div className="bg-background flex min-h-screen flex-col pb-24 text-left">
      {/* ─ sticky top nav ─ */}
      <header className="border-border bg-background sticky top-0 z-10 flex items-center justify-between border-b px-4 py-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-foreground hover:text-foreground/80"
        >
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
            <Avatar src={authorAvatar || undefined} size="md" />
            <div className="flex flex-col text-left">
              <span className="text-foreground text-sm font-normal">
                {post.author?.username ?? '알 수 없음'}
              </span>
              <span className="text-muted-foreground text-xs">
                @ {post.author?.accountname ?? ''}
              </span>
            </div>
          </div>

          {/* post text */}
          {post.content?.trim() && (
            <div className="px-4 pb-4">
              <p className="text-foreground text-left text-base leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
          )}

          {/* post image */}
          {postImage && (
            <div className="mb-4 space-y-2 px-4">
              <img
                src={postImage}
                alt="게시글 이미지"
                className="h-auto w-full rounded-xl object-cover"
              />
            </div>
          )}

          {/* actions */}
          <div className="flex items-center gap-4 px-4">
            <button type="button" className="flex items-center gap-1.5">
              <Heart className="text-muted-foreground h-5 w-5" strokeWidth={1.5} />
              <span className="text-muted-foreground text-xs">{post.heartCount ?? 0}</span>
            </button>
            <button type="button" className="flex items-center gap-1.5">
              <MessageCircle className="text-muted-foreground h-5 w-5" strokeWidth={1.5} />
              <span className="text-muted-foreground text-xs">{post.commentCount ?? 0}</span>
            </button>
          </div>

          {/* date */}
          <p className="text-muted-foreground mt-3 px-4 text-left text-xs">
            {formatDate(post.createdAt)}
          </p>
        </article>

        {/* divider */}
        <div className="border-muted border-b" />

        {/* comments */}
        <div className="divide-muted divide-y">
          {isLoadingComments ? (
            <div className="text-muted-foreground px-4 py-8 text-center text-sm">로드 중...</div>
          ) : comments.length === 0 ? (
            <div className="text-muted-foreground px-4 py-8 text-center text-sm">
              댓글이 없습니다.
            </div>
          ) : (
            comments.map((c) => (
              <CommentItem
                key={c.id}
                avatar={c.avatar}
                userName={c.userName}
                time={c.time}
                text={c.text}
              />
            ))
          )}
        </div>
      </main>

      {/* ─ fixed comment input bar ─ */}
      <div className="border-muted bg-background fixed right-0 bottom-0 left-0 w-full border-t px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="bg-muted flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full">
            <Avatar size="sm" />
          </div>
          <div className="relative flex-1">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="댓글 입력하기..."
              className="border-muted bg-muted placeholder:text-muted-foreground focus:border-muted focus:bg-background h-10 w-full rounded-full border px-4 py-2 text-sm outline-none focus:ring-0"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isSubmitting) handleSubmitComment();
              }}
            />
            <button
              type="button"
              onClick={handleSubmitComment}
              disabled={!commentText.trim() || isSubmitting}
              className={`absolute top-1/2 right-3 -translate-y-1/2 text-sm font-medium transition-colors ${
                commentText.trim() && !isSubmitting
                  ? 'text-foreground hover:text-primary'
                  : 'text-muted-foreground cursor-not-allowed'
              }`}
            >
              {isSubmitting ? '로딩...' : '게시'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
