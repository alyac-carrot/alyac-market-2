export interface CommentAuthor {
  _id: string;
  username: string;
  accountname: string;
  intro: string;
  image: string;
  isfollow: boolean;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: CommentAuthor;
}

export interface CreateCommentRequest {
  content: string;
  postId: string;
}

export interface CreateCommentResponse {
  comment: Comment;
}

export interface GetCommentsRequest {
  postId: string;
}

export interface GetCommentsResponse {
  comment: Comment[];
}
