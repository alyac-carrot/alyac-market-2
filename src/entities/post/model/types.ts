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
    hearted: boolean;
    heartCount: number;
    commentCount: number;
    author: {
      _id: string;
      username: string;
      accountname: string;
      intro: string;
      image: string;
      isfollow: boolean;
    };
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
export interface GetPostsResponse {
  post: Post[];
}
