import { z } from 'zod';

import {
  followerListResponseSchema,
  followResponseSchema,
  followingListResponseSchema,
  getProfileResponseSchema,
  profileSchema,
} from './schemas';

export type Profile = z.infer<typeof profileSchema>;
export type GetProfileResponse = z.infer<typeof getProfileResponseSchema>;
export type FollowResponse = z.infer<typeof followResponseSchema>;
export type FollowingListResponse = z.infer<typeof followingListResponseSchema>;
export type FollowerListResponse = z.infer<typeof followerListResponseSchema>;

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
