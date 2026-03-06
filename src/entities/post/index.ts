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

// model – hooks
export { useGetPost } from './model/queries/useGetPost';
export { useGetPosts } from './model/queries/useGetPosts';
export { useGetUserPosts } from './model/queries/useGetUserPosts';
export { useCreatePost } from './model/mutations/useCreatePost';
export { useUpdatePost } from './model/mutations/useUpdatePost';
export { useDeletePost } from './model/mutations/useDeletePost';
export { useGetComments } from './model/queries/useGetComments';
export { useCreateComment } from './model/mutations/useCreateComment';
export { useDeleteComment } from './model/mutations/useDeleteComment';
export { useLikePost } from './model/mutations/useLikePost';

// model – types
export type { Post, GetPostResponse, GetPostsResponse, CreatePostRequest, CreatePostResponse } from './model/types/types';
export type { PostAuthor, UserPost, GetUserPostsResponse } from './model/types/userPosts';
export type {
  Comment,
  CommentAuthor,
  CreateCommentRequest,
  CreateCommentResponse,
  GetCommentsRequest,
  GetCommentsResponse,
} from './model/types/comment';
