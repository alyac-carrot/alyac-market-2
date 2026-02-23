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

export interface GetPostsResponse {
  posts: Post[];
}
