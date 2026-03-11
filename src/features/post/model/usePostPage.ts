import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useMeQuery } from '@/entities/user';
import {
  useCreateComment,
  useDeleteComment,
  useDeletePost,
  useGetComments,
  useGetPost,
  useLikePost,
} from '@/entities/post';
import type { Comment } from '@/entities/post';

export function usePostPage(postId: string) {
  const navigate = useNavigate();

  const [commentText, setCommentText] = useState('');
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [isPostDeleteDialogOpen, setIsPostDeleteDialogOpen] = useState(false);
  const [isReportCommentDialogOpen, setIsReportCommentDialogOpen] = useState(false);
  const [isReportPostDialogOpen, setIsReportPostDialogOpen] = useState(false);

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
  const isHearted = post?.hearted ?? false;
  const heartCount = post?.heartCount ?? 0;

  // ── handlers ─────────────────────────────────────────────────────────────

  const handleLikeClick = () => {
    if (isLikePending || !post) return;
    toggleLike(!post.hearted);
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

    // Not my comment → open report dialog instead of window.confirm
    setSelectedCommentId(null);
    setIsReportCommentDialogOpen(true);
  };

  const handleDeletePost = () => {
    deletePostMutate(postId, {
      onSuccess: () => {
        setIsPostDeleteDialogOpen(false);
        navigate('/feed', { replace: true });
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
    isReportCommentDialogOpen,
    setIsReportCommentDialogOpen,
    isReportPostDialogOpen,
    setIsReportPostDialogOpen,
    handleLikeClick,
    handleSubmitComment,
    handleActionComment,
    handleDeletePost,
  };
}
