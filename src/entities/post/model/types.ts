export interface Post {
  id: string;
  content: string;
  image: string;
  createdAt: string;
  author: {
    accountname: string;
    username: string;
    image: string;
  };
  commentCount: number;
  heartCount: number;
  hearted: boolean;
}

export interface GetPostResponse {
  post: {
    id: string;
    content: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface CreatePostRequest {
  content: string;
  image?: string;
}

export interface CreatePostResponse {
  id: string;
  content: string;
  image?: string;
  createdAt: string;
  author: {
    accountname: string;
    username: string;
    image: string;
  };
  commentCount: number;
  heartCount: number;
  hearted: boolean;
}
