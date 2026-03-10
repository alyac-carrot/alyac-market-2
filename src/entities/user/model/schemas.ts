import { z } from 'zod';

import { zodAccountnameSchema, zodImageUrlSchema } from '@/shared/lib';

export const userSchema = z.object({
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

export const myInfoResponseSchema = z.object({
  user: userSchema,
});

export const updateProfileResponseSchema = z.object({
  user: userSchema,
});

export type User = z.infer<typeof userSchema>;
export type MyInfoResponse = z.infer<typeof myInfoResponseSchema>;
export type UpdateProfileResponse = z.infer<typeof updateProfileResponseSchema>;
