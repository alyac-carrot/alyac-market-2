// api
export { getPostById } from './api/getPostById';
export { getPostsList } from './api/getPostsList';
export { getUserPosts } from './api/getUserPosts';
export { createPost } from './api/createPost';
export { updatePost } from './api/updatePost';
export { deletePost } from './api/deletePost';
export { getComments } from './api/getComments';
export { createComment } from './api/createComment';
export { deleteComment } from './api/deleteComment';
export { likePost } from './api/likePost';
export { getFeedPosts } from './api/getFeedPosts';

// model – hooks
export { useGetPost } from './model/queries/useGetPost';
export { useGetPosts } from './model/queries/useGetPosts';
export { useGetUserPosts } from './model/queries/useGetUserPosts';
export { useCreatePost } from './hooks/mutations/useCreatePost';
export { useUpdatePost } from './hooks/mutations/useUpdatePost';
export { useDeletePost } from './hooks/mutations/useDeletePost';
export { useGetComments } from './model/queries/useGetComments';
export { useCreateComment } from './hooks/mutations/useCreateComment';
export { useDeleteComment } from './hooks/mutations/useDeleteComment';
export { useLikePost } from './hooks/mutations/useLikePost';
export { useLikePostMutation } from './hooks/mutations/useLikePostMutation';
export { useGetFeedPosts } from './model/queries/useGetFeedPosts';
export { usePostPage } from './hooks/usePostPage';

// model – types
export type {
  Post,
  GetPostResponse,
  GetPostsResponse,
  CreatePostRequest,
  CreatePostResponse,
} from './model/types/types';
export type { PostAuthor, UserPost, GetUserPostsResponse } from './model/types/userPosts';
export type {
  Comment,
  CommentAuthor,
  CreateCommentRequest,
  CreateCommentResponse,
  GetCommentsRequest,
  GetCommentsResponse,
} from './model/types/comment';
