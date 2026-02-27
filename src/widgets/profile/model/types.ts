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

export type Profile = {
  id: string;
  nickname: string;
  handle: string;
  bio?: string;
  avatarUrl?: string;
  followersCount: number;
  followingsCount: number;
};

export type PostViewMode = 'normal' | 'media';
