import axiosInstance from '@/shared/api/axios';
import { parseWithSchema } from '@/shared/lib';

import { followResponseSchema, getProfileResponseSchema } from '../model/schemas';
import type {
  FollowResponse,
  FollowerListResponse,
  FollowingListResponse,
  GetProfileResponse,
} from '../model/type';

export const getProfile = async (accountname: string): Promise<GetProfileResponse> => {
  const response = await axiosInstance.get(`/profile/${accountname}`);

  return parseWithSchema(getProfileResponseSchema, response.data, 'getProfile');
};

export const followUser = async (accountname: string): Promise<FollowResponse> => {
  const response = await axiosInstance.post(`/profile/${accountname}/follow`);

  return parseWithSchema(followResponseSchema, response.data, 'followUser');
};

export const unfollowUser = async (accountname: string): Promise<FollowResponse> => {
  const response = await axiosInstance.delete(`/profile/${accountname}/unfollow`);

  return parseWithSchema(followResponseSchema, response.data, 'unfollowUser');
};

export const getFollowingList = (accountname: string) =>
  axiosInstance.get<FollowingListResponse>(`/profile/${accountname}/following`);

export const getFollowerList = (accountname: string) =>
  axiosInstance.get<FollowerListResponse>(`/profile/${accountname}/follower`);
