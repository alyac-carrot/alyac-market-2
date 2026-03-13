import { z } from 'zod';

import { zodAccountnameSchema, zodEmailSchema, zodImageUrlSchema } from '@/shared/lib';

const authUserBaseSchema = z.object({
  _id: z.string(),
  username: z.string(),
  email: zodEmailSchema,
  accountname: zodAccountnameSchema,
  image: zodImageUrlSchema,
});

export const authUserSchema = authUserBaseSchema.extend({
  intro: z.string(),
  following: z.array(z.string()),
  follower: z.array(z.string()),
  followerCount: z.number(),
  followingCount: z.number(),
});

export const signInUserSchema = authUserBaseSchema.extend({
  intro: z.string().default(''),
  following: z.array(z.string()).default([]),
  follower: z.array(z.string()).default([]),
  followerCount: z.number().default(0),
  followingCount: z.number().default(0),
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const signInResponseSchema = z.object({
  user: signInUserSchema,
});
