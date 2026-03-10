export type {
  FollowerListResponse,
  FollowResponse,
  FollowingListResponse,
  GetProfileResponse,
  Profile,
} from '../schemas';

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
  liked: boolean;
  commentCount: number;
};

export type PostViewMode = 'normal' | 'media';
