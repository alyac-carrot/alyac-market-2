export type Profile = {
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
  isfollow?: boolean;
};

export type GetProfileResponse = {
  profile: Profile;
};

export type FollowResponse = {
  profile: Profile;
};

export type FollowingListResponse = {
  following: Profile[];
};

export type FollowerListResponse = {
  follower: Profile[];
};

// UI 도메인 타입
export type UIProfile = {
  id: string;
  nickname: string;
  handle: string;
  bio?: string;
  avatarUrl?: string;
  followersCount: number;
  followingsCount: number;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  thumbnailUrl?: string;
};

export type Post = {
  id: string;
  content: string;
  imageUrl?: string;
  likeCount: number;
  commentCount: number;
};

export type PostViewMode = 'normal' | 'media';
