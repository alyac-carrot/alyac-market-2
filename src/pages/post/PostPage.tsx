import { useEffect, useState } from 'react';
import { ArrowLeft, Heart, MessageCircle, MoreVertical } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useGetPost,
  useCreateComment,
  useDeleteComment,
  useGetComments,
  useLikePost,
} from '@/entities/post';
import { pickFirstImage, toImageUrl, formatRelativeTime, formatDate } from '@/shared/lib';
import { useMeQuery } from '@/entities/user';
import { Avatar } from '@/shared/ui/Avatar';

import type { Comment } from '@/entities/post';


/* ── single comment ── */
function CommentItem({
  comment,
  onKebabClick,
}: {
  comment: Comment;
  onKebabClick: (commentId: string) => void;
}) {
  const authorImage = comment.author?.image ? toImageUrl(comment.author.image) : '';

  return (
    <div className="flex gap-3 px-4 py-4">
      <Avatar 
        src={authorImage} 
        alt={comment.author?.username} 
        className="h-10 w-10" 
      />

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-foreground font-semibold">
              {comment.author?.username ?? '알 수 없음'}
            </span>
            <span className="text-muted-foreground text-xs">
              · {formatRelativeTime(comment.createdAt)}
            </span>
          </div>
          <button
            type="button"
            className="h-6 w-6"
            onClick={() => onKebabClick(comment.id)}
          >
            <MoreVertical className="text-muted-foreground h-4 w-4" />
          </button>
        </div>
        <p className="text-foreground text-left text-sm leading-relaxed">{comment.content}</p>
      </div>
    </div>
  );
}

/* ── bottom sheet modal ── */
function BottomSheetModal({
  isOpen,
  onClose,
  onDelete,
  isDeleting,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 transition-opacity"
        onClick={onClose}
      />

      {/* sheet */}
      <div className="bg-popover border-border fixed right-0 bottom-0 left-0 z-50 rounded-t-2xl border-t shadow-lg animate-in slide-in-from-bottom duration-200">
        {/* handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="bg-muted-foreground/30 h-1 w-10 rounded-full" />
        </div>

        {/* actions */}
        <div className="px-2 pb-6 pt-1">
          <button
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
            className="text-foreground hover:bg-accent w-full rounded-lg px-5 py-4 text-left text-base transition-colors disabled:opacity-50"
          >
            {isDeleting ? '삭제 중...' : '삭제'}
          </button>
        </div>
      </div>
    </>
  );
}

/* ── main page ── */
export default function PostPage() {
  const navigate = useNavigate();
  const { postId = '' } = useParams();
  const [commentText, setCommentText] = useState('');
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);

  const meQuery = useMeQuery();
  const currentUser = meQuery.data?.user;


  // Fetch post data
  const { data: postData, isLoading: isLoadingPost, isError } = useGetPost(postId);

  // Fetch comments for this post
  const { data: commentsData, isLoading: isLoadingComments } = useGetComments(postId);
  const { mutate: submitComment, isPending: isSubmitting } = useCreateComment(postId);
  const { mutate: toggleLike, isPending: isLikePending } = useLikePost(postId);
  const { mutate: deleteCommentMutate, isPending: isDeleting } = useDeleteComment(postId);

  const comments: Comment[] = commentsData?.comment ?? [];

  // Optimistic heart state — synced from server data once loaded
  const [isHearted, setIsHearted] = useState(false);
  const [heartCount, setHeartCount] = useState(0);

  useEffect(() => {
    if (postData?.post) {
      setIsHearted(postData.post.hearted);
      setHeartCount(postData.post.heartCount ?? 0);
    }
  }, [postData]);

  const handleLikeClick = () => {
    if (isLikePending) return;
    // Optimistic update
    setIsHearted((prev) => !prev);
    setHeartCount((prev) => (isHearted ? prev - 1 : prev + 1));
    toggleLike();
  };

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

  const handleDeleteComment = () => {
    if (!selectedCommentId) return;

    deleteCommentMutate(selectedCommentId, {
      onSuccess: () => {
        setSelectedCommentId(null);
      },
    });
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
  const hasText = commentText.trim().length > 0;

  return (
    <div className="bg-background flex min-h-screen flex-col pb-16 text-left">
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
            <button
              type="button"
              onClick={handleLikeClick}
              disabled={isLikePending}
              className="flex items-center gap-1.5 transition-transform active:scale-90 disabled:opacity-70"
            >
              <Heart
                className="h-5 w-5 transition-colors"
                strokeWidth={1.5}
                fill={isHearted ? '#ef4444' : 'none'}
                stroke={isHearted ? '#ef4444' : 'currentColor'}
                style={isHearted ? {} : { color: 'var(--muted-foreground)' }}
              />
              <span
                className="text-xs transition-colors"
                style={{ color: isHearted ? '#ef4444' : 'var(--muted-foreground)' }}
              >
                {heartCount}
              </span>
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
                comment={c}
                onKebabClick={(id) => setSelectedCommentId(id)}
              />
            ))
          )}
        </div>
      </main>

      {/* ─ fixed comment input bar ─ */}
      <div className="border-border bg-background fixed right-0 bottom-0 left-0 z-10 w-full border-t px-4 py-2">
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            <Avatar src={toImageUrl(currentUser?.image)} size="sm" />
          </div>
          <div className="relative flex-1">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="댓글 입력하기..."
              className="border-border bg-muted placeholder:text-muted-foreground h-10 w-full rounded-full border px-4 pr-14 text-sm outline-none focus:ring-0"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isSubmitting) handleSubmitComment();
              }}
            />
            <button
              type="button"
              onClick={handleSubmitComment}
              disabled={!hasText || isSubmitting}
              className={`absolute top-1/2 right-3 -translate-y-1/2 text-sm font-semibold transition-colors ${
                hasText && !isSubmitting
                  ? 'text-green-500 hover:text-green-600'
                  : 'text-muted-foreground cursor-not-allowed'
              }`}
            >
              {isSubmitting ? '로딩...' : '게시'}
            </button>
          </div>
        </div>
      </div>

      {/* ─ delete comment bottom sheet ─ */}
      <BottomSheetModal
        isOpen={selectedCommentId !== null}
        onClose={() => setSelectedCommentId(null)}
        onDelete={handleDeleteComment}
        isDeleting={isDeleting}
      />
    </div>
  );
}
