import axiosInstance from '@/shared/api/axios';
import { parseWithSchema } from '@/shared/lib';

import {
  followerListApiResponseSchema,
  followingListApiResponseSchema,
} from '../model/schemas';
import type { FollowerListResponse, FollowingListResponse, Profile } from '../model/type';

export type FollowUser = Profile;

export const getFollowers = async (
  accountname: string,
  limit = 10,
  skip = 0,
): Promise<FollowerListResponse> => {
  const response = await axiosInstance.get(`/profile/${accountname}/follower`, {
    params: { limit, skip, _t: Date.now() },
  });

  return parseWithSchema(followerListApiResponseSchema, response.data, 'getFollowers');
};

export const getFollowings = async (
  accountname: string,
  limit = 10,
  skip = 0,
): Promise<FollowingListResponse> => {
  const response = await axiosInstance.get(`/profile/${accountname}/following`, {
    params: { limit, skip, _t: Date.now() },
  });

  return parseWithSchema(followingListApiResponseSchema, response.data, 'getFollowings');
};
