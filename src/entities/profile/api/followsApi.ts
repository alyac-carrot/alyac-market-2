import axiosInstance from '@/shared/api/axios';
import { parseWithSchema } from '@/shared/lib';

import {
  followerListResponseSchema,
  followingListResponseSchema,
  type FollowerListResponse,
  type FollowingListResponse,
  type Profile,
} from '../model/schemas';

export type FollowUser = Profile;

export const getFollowers = async (
  accountname: string,
  limit = 10,
  skip = 0,
): Promise<FollowerListResponse> => {
  const response = await axiosInstance.get(`/profile/${accountname}/follower`, {
    params: { limit, skip },
  });

  return parseWithSchema(followerListResponseSchema, response.data, 'getFollowers');
};

export const getFollowings = async (
  accountname: string,
  limit = 10,
  skip = 0,
): Promise<FollowingListResponse> => {
  const response = await axiosInstance.get(`/profile/${accountname}/following`, {
    params: { limit, skip },
  });

  return parseWithSchema(followingListResponseSchema, response.data, 'getFollowings');
};
