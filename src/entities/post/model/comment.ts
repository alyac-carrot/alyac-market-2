export interface Comment {
  id: string | number;
  avatar: string;
  userName: string;
  time: string;
  text: string;
}

export interface CreateCommentRequest {
  content: string;
  postId: string;
}

export interface CreateCommentResponse {
  id: string | number;
  avatar: string;
  userName: string;
  time: string;
  text: string;
}

export interface GetCommentsRequest {
  postId: string;
}

export interface GetCommentsResponse {
  comments: Comment[];
}
