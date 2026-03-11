import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreateComment } from './mutations/useCreateComment';
import { useDeleteComment } from './mutations/useDeleteComment';
import { useDeletePost } from './mutations/useDeletePost';
import { useLikePost } from './mutations/useLikePost';
import { useGetComments } from '../model/queries/useGetComments';
import { useGetPost } from '../model/queries/useGetPost';
import type { Comment } from '../model/types/comment';
import { useMeQuery } from '@/entities/user';

export function usePostPage(postId: string) {
  const navigate = useNavigate();

  const [commentText, setCommentText] = useState('');
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [isPostDeleteDialogOpen, setIsPostDeleteDialogOpen] = useState(false);
  const [likeOverride, setLikeOverride] = useState<{
    hearted: boolean;
    heartCount: number;
  } | null>(null);

  const { data: meData } = useMeQuery();
  const currentUser = meData?.user;

  const { data: postData, isLoading: isLoadingPost, isError } = useGetPost(postId);
  const { data: commentsData, isLoading: isLoadingComments } = useGetComments(postId);
  const { mutate: submitComment, isPending: isSubmitting } = useCreateComment(postId);
  const { mutate: toggleLike, isPending: isLikePending } = useLikePost(postId);
  const { mutate: deleteCommentMutate, isPending: isDeleting } = useDeleteComment(postId);
  const { mutate: deletePostMutate, isPending: isDeletingPost } = useDeletePost();

  const comments: Comment[] = commentsData?.comment ?? [];

  // ── derived ──────────────────────────────────────────────────────────────

  const post = postData?.post ?? null;
  const isMyPost = post?.author?.accountname === currentUser?.accountname;
  const isHearted = likeOverride?.hearted ?? post?.hearted ?? false;
  const heartCount = likeOverride?.heartCount ?? post?.heartCount ?? 0;

  // ── handlers ─────────────────────────────────────────────────────────────

  const handleLikeClick = () => {
    if (isLikePending || !post) return;

    const nextHearted = !isHearted;
    const nextHeartCount = nextHearted ? heartCount + 1 : Math.max(0, heartCount - 1);

    setLikeOverride({
      hearted: nextHearted,
      heartCount: nextHeartCount,
    });

    toggleLike();
  };

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;

    submitComment(
      { content: commentText, postId },
      { onSuccess: () => setCommentText('') },
    );
  };

  const handleActionComment = () => {
    if (!selectedCommentId) return;

    const targetComment = comments.find((c) => c.id === selectedCommentId);
    if (!targetComment) return;

    const isMyComment = targetComment.author?.accountname === currentUser?.accountname;

    if (isMyComment) {
      deleteCommentMutate(selectedCommentId, {
        onSuccess: () => setSelectedCommentId(null),
      });
      return;
    }

    setSelectedCommentId(null);
    setTimeout(() => {
      if (window.confirm('해당 댓글을 신고하시겠습니까?')) {
        alert('해당 댓글을 신고했습니다.');
      }
    }, 0);
  };

  const handleDeletePost = () => {
    deletePostMutate(postId, {
      onSuccess: () => {
        setIsPostDeleteDialogOpen(false);
        navigate('/', { replace: true });
      },
    });
  };

  return {
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
    handleLikeClick,
    handleSubmitComment,
    handleActionComment,
    handleDeletePost,
  };
}
