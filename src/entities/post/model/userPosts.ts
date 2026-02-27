export interface PostAuthor {
  _id: string;
  username: string;
  email: string;
  accountname: string;
  intro: string;
  image: string;
  following: string[];
  follower: string[];
  followerCount: number;
  followingCount: number;
}

export interface UserPost {
  id: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  hearted: boolean;
  heartCount: number;
  commentCount: number;
  authorId: string;
  author: PostAuthor;
}

export interface GetUserPostsResponse {
  post: UserPost[];
}
