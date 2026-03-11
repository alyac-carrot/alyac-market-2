import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { splitImagePaths, toImageUrl } from '@/shared/lib';
import { BottomSheetModal, ConfirmDialog } from '@/shared/ui';
import { Header, PageWithHeader } from '@/widgets/header';
import { usePostPage } from '@/features/post';

import { CommentInputBar } from './ui/CommentInputBar';
import { CommentList } from './ui/CommentList';
import { PostArticle } from './ui/PostArticle';
import { PostMenu } from './ui/PostMenu';

export default function PostPage() {
  const { postId = '' } = useParams();
  const navigate = useNavigate();

  const {
    post,
    comments,
    currentUser,
    isMyPost,
    isHearted,
    heartCount,
    isLoadingPost,
    isLoadingComments,
    isLikePending,
    isSubmitting,
    isDeleting,
    isDeletingPost,
    isError,
    commentText,
    setCommentText,
    selectedCommentId,
    setSelectedCommentId,
    isPostDeleteDialogOpen,
    setIsPostDeleteDialogOpen,
    isReportPostDialogOpen,
    setIsReportPostDialogOpen,
    isReportCommentDialogOpen,
    setIsReportCommentDialogOpen,
    handleLikeClick,
    handleSubmitComment,
    handleActionComment,
    handleDeletePost,
  } = usePostPage(postId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoadingPost) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex h-screen items-center justify-center"
      >
        <span className="text-muted-foreground text-sm">불러오는 중...</span>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div
        role="alert"
        className="flex h-screen items-center justify-center"
      >
        <p className="text-muted-foreground text-sm">게시글을 불러오지 못했습니다.</p>
      </div>
    );
  }

  return (
    <PageWithHeader
      className="bg-background flex min-h-screen flex-col text-left"
      contentClassName="flex flex-1 flex-col pb-16"
      header={
        <Header
          showBackButton
          right={
            <PostMenu
              isMyPost={isMyPost}
              onEdit={() => navigate(`/post/${postId}/edit`)}
              onDeleteRequest={() => setIsPostDeleteDialogOpen(true)}
              onReportRequest={() => setIsReportPostDialogOpen(true)}
            />
          }
        />
      }
    >
      <main className="flex-1 overflow-y-auto">
        <PostArticle
          post={post}
          authorAvatar={post.author?.image ? toImageUrl(post.author.image) : undefined}
          postImages={splitImagePaths(post.image).map((path) => toImageUrl(path))}
          isHearted={isHearted}
          heartCount={heartCount}
          isLikePending={isLikePending}
          onLike={handleLikeClick}
        />

        <div className="border-muted border-b" />

        <CommentList
          comments={comments}
          isLoading={isLoadingComments}
          onKebabClick={setSelectedCommentId}
        />
      </main>

      <CommentInputBar
        avatarSrc={toImageUrl(currentUser?.image)}
        value={commentText}
        onChange={setCommentText}
        onSubmit={handleSubmitComment}
        isSubmitting={isSubmitting}
      />

      {/* Comment action sheet (delete mine / report others) */}
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

      {/* Post delete confirm dialog */}
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

      {/* Post report confirm dialog */}
      <ConfirmDialog
        open={isReportPostDialogOpen}
        onOpenChange={setIsReportPostDialogOpen}
        title="해당 게시글을 신고하시겠습니까?"
        cancelText="취소"
        confirmText="신고"
        onConfirm={() => {
          // TODO: wire up report API when available
          setIsReportPostDialogOpen(false);
        }}
      />

      {/* Comment report confirm dialog */}
      <ConfirmDialog
        open={isReportCommentDialogOpen}
        onOpenChange={setIsReportCommentDialogOpen}
        title="해당 댓글을 신고하시겠습니까?"
        cancelText="취소"
        confirmText="신고"
        onConfirm={() => {
          // TODO: wire up report API when available
          setIsReportCommentDialogOpen(false);
        }}
      />
    </PageWithHeader>
  );
}
