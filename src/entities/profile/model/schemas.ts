import { z } from 'zod';

import { zodAccountnameSchema, zodImageUrlSchema } from '@/shared/lib';

export const profileSchema = z.object({
  _id: z.string(),
  username: z.string(),
  accountname: zodAccountnameSchema,
  intro: z.string().default(''),
  image: zodImageUrlSchema.default(''),
  following: z.array(z.string()).default([]),
  follower: z.array(z.string()).default([]),
  followerCount: z.number().default(0),
  followingCount: z.number().default(0),
  isfollow: z.boolean().optional(),
});

export const getProfileResponseSchema = z.object({
  profile: profileSchema,
});

export const followResponseSchema = z.object({
  profile: profileSchema,
});

export const followingListResponseSchema = z.object({
  following: z.array(profileSchema),
});

export const followerListResponseSchema = z.object({
  follower: z.array(profileSchema),
});

export const followingListApiResponseSchema = z.union([
  followingListResponseSchema,
  z.array(profileSchema).transform((following) => ({ following })),
]);

export const followerListApiResponseSchema = z.union([
  followerListResponseSchema,
  z.array(profileSchema).transform((follower) => ({ follower })),
]);

export type Profile = z.infer<typeof profileSchema>;
export type GetProfileResponse = z.infer<typeof getProfileResponseSchema>;
export type FollowResponse = z.infer<typeof followResponseSchema>;
export type FollowingListResponse = z.infer<typeof followingListResponseSchema>;
export type FollowerListResponse = z.infer<typeof followerListResponseSchema>;
