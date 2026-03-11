import { useEffect, useState } from 'react';

import { Heart, MessageCircle, MoreVertical } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useCreateComment,
  useDeleteComment,
  useDeletePost,
  useGetComments,
  useGetPost,
  useLikePost,
} from '@/entities/post';
import type { Comment } from '@/entities/post';
import { useMeQuery } from '@/entities/user';
import { CommentItem } from '@/features/post';
import { formatDate, pickFirstImage, toImageUrl } from '@/shared/lib';
import { BottomSheetModal, Button, ConfirmDialog, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui';
import { Avatar } from '@/shared/ui/Avatar';
import { Header, PageWithHeader } from '@/widgets/header';

/* ── main page ── */
export default function PostPage() {
  const { postId = '' } = useParams();
  const navigate = useNavigate();

  const [commentText, setCommentText] = useState('');
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [isPostDeleteDialogOpen, setIsPostDeleteDialogOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const meQuery = useMeQuery();
  const currentUser = meQuery.data?.user;

  // Fetch post data
  const { data: postData, isLoading: isLoadingPost, isError } = useGetPost(postId);

  // Fetch comments for this post
  const { data: commentsData, isLoading: isLoadingComments } = useGetComments(postId);
  const { mutate: submitComment, isPending: isSubmitting } = useCreateComment(postId);
  const { mutate: toggleLike, isPending: isLikePending } = useLikePost(postId);
  const { mutate: deleteCommentMutate, isPending: isDeleting } = useDeleteComment(postId);
  const { mutate: deletePostMutate, isPending: isDeletingPost } = useDeletePost();

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

  const handleActionComment = () => {
    if (!selectedCommentId) return;

    const targetComment = comments.find((c) => c.id === selectedCommentId);
    if (!targetComment) return;

    const isMyComment = targetComment.author?.accountname === currentUser?.accountname;

    if (isMyComment) {
      deleteCommentMutate(selectedCommentId, {
        onSuccess: () => {
          setSelectedCommentId(null);
        },
      });
    } else {
      setSelectedCommentId(null);
      setTimeout(() => {
        if (window.confirm('해당 댓글을 신고하시겠습니까?')) {
          alert('해당 댓글이 신고되었습니다');
        }
      }, 0);
    }
  };

  const handleDeletePost = () => {
    deletePostMutate(postId, {
      onSuccess: () => {
        setIsPostDeleteDialogOpen(false);
        navigate('/', { replace: true });
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

  const isMyPost = post.author?.accountname === currentUser?.accountname;

  const postMenu = (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="ghost" size="icon">
          <MoreVertical className="h-6 w-6" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" side="bottom" sideOffset={8} className="w-40 p-0">
        <div className="flex flex-col py-2">
          <div className="bg-muted mx-auto mb-2 h-1 w-8 rounded-full" />
          {isMyPost ? (
            <>
              <button
                type="button"
                onClick={() => navigate(`/post/${postId}/edit`)}
                className="text-foreground inline-flex w-full px-4 py-3 text-sm"
              >
                수정
              </button>
              <button
                type="button"
                onClick={() => setIsPostDeleteDialogOpen(true)}
                className="inline-flex w-full px-4 py-3 text-sm text-red-500"
              >
                삭제
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                setTimeout(() => {
                  if (window.confirm('해당 게시글을 신고하시겠습니까?')) {
                    alert('해당 게시글이 신고되었습니다');
                  }
                }, 0);
              }}
              className="inline-flex w-full px-4 py-3 text-sm text-red-500"
            >
              신고
            </button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <PageWithHeader
      className="bg-background flex min-h-screen flex-col text-left"
      contentClassName="flex flex-1 flex-col pb-16"
      header={<Header showBackButton right={postMenu} />}
    >
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
              <CommentItem key={c.id} comment={c} onKebabClick={(id) => setSelectedCommentId(id)} />
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

      {/* ─ comment action bottom sheet ─ */}
      <BottomSheetModal
        isOpen={selectedCommentId !== null}
        onClose={() => setSelectedCommentId(null)}
        onAction={handleActionComment}
        isLoading={isDeleting}
        actionLabel={
          comments.find((c) => c.id === selectedCommentId)?.author?.accountname ===
          currentUser?.accountname
            ? '삭제'
            : '신고하기'
        }
      />

      <ConfirmDialog
        open={isPostDeleteDialogOpen}
        onOpenChange={setIsPostDeleteDialogOpen}
        title="게시글을 삭제하시겠습니까?"
        cancelText="취소"
        confirmText="삭제"
        confirmLoadingText="삭제 중..."
        onConfirm={handleDeletePost}
        isLoading={isDeletingPost}
      />
    </PageWithHeader>
  );
}
