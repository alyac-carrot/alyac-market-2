// api
export { getPostById } from './api/getPostById';
export { getPostsList } from './api/getPostsList';
export { getUserPosts } from './api/getUserPosts';
export { createPost } from './api/createPost';
export { updatePost } from './api/updatePost';
export { deletePost } from './api/deletePost';
export { getComments, createComment, deleteComment } from './api/comments';

// model – hooks
export { useGetPost } from './model/useGetPost';
export { useGetPosts } from './model/useGetPosts';
export { useGetUserPosts } from './model/useGetUserPosts';
export { useCreatePost } from './model/useCreatePost';
export { useUpdatePost } from './model/useUpdatePost';
export { useDeletePost } from './model/useDeletePost';
export { useGetComments, useCreateComment, useDeleteComment } from './model/useComments';

// model – types
export type { Post, GetPostResponse, GetPostsResponse, CreatePostRequest, CreatePostResponse } from './model/types';
export type { PostAuthor, UserPost, GetUserPostsResponse } from './model/userPosts';
export type {
  Comment,
  CommentAuthor,
  CreateCommentRequest,
  CreateCommentResponse,
  GetCommentsRequest,
  GetCommentsResponse,
} from './model/comment';
