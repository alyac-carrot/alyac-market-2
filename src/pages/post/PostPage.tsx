import { useEffect, useState } from 'react';

import { EllipsisVertical, Heart, MessageCircle } from 'lucide-react';
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
import {
  BottomSheetModal,
  Button,
  ConfirmDialog,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui';
import { Avatar } from '@/shared/ui/Avatar';
import { Header, PageWithHeader } from '@/widgets/header';

/* ── main page ── */
export default function PostPage() {
  const { postId = '' } = useParams();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [openPostMenu, setOpenPostMenu] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

  const handlePostDelete = () => {
    deletePostMutate(postId, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        navigate(-1);
      },
    });
  };

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
    <PageWithHeader
      className="bg-background flex min-h-screen flex-col pb-16 text-left"
      header={<Header showBackButton showMenu />}
    >
      {/* ─ scrollable main ─ */}
      <main className="flex-1 overflow-y-auto">
        {/* post article */}
        <article className="border-border border-b pb-4">
          {/* post header */}
          <div className="flex items-center gap-3 px-4 py-4">
            <Avatar src={authorAvatar || undefined} size="md" />
            <div className="flex min-w-0 flex-1 flex-col text-left">
              <span className="text-foreground truncate text-sm font-normal">
                {post.author?.username ?? '알 수 없음'}
              </span>
              <span className="text-muted-foreground truncate text-xs">
                @ {post.author?.accountname ?? ''}
              </span>
            </div>

            <DropdownMenu modal={true} open={openPostMenu} onOpenChange={setOpenPostMenu}>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground h-8 w-8"
                >
                  <EllipsisVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="border-border bg-popover w-44 rounded-xl border shadow-lg"
              >
                <div className="flex justify-center pt-2">
                  <div className="bg-muted-foreground/30 h-1 w-10 rounded-full" />
                </div>
                <div className="py-2">
                  {post.author?.accountname === currentUser?.accountname ? (
                    <>
                      <DropdownMenuItem
                        className="cursor-pointer px-5 py-3 text-lg"
                        onClick={() => {
                          setOpenPostMenu(false);
                          navigate(`/post/${postId}/edit`);
                        }}
                      >
                        수정
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer px-5 py-3 text-lg"
                        onClick={() => {
                          setOpenPostMenu(false);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        삭제
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem
                      className="cursor-pointer px-5 py-3 text-lg"
                      onClick={() => {
                        setOpenPostMenu(false);
                        setTimeout(() => {
                          if (window.confirm('해당 게시글을 신고하시겠습니까?')) {
                            alert('해당 게시글이 신고되었습니다');
                          }
                        }, 0);
                      }}
                    >
                      신고
                    </DropdownMenuItem>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
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
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="게시글을 삭제할까요?"
        confirmText="삭제"
        confirmLoadingText="삭제 중..."
        onConfirm={handlePostDelete}
        isLoading={isDeletingPost}
      />
    </PageWithHeader>
  );
}
