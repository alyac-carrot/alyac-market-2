import axiosInstance from '@/shared/api/axios';
import { parseWithSchema } from '@/shared/lib';

import type {
  FollowResponse,
  FollowerListResponse,
  FollowingListResponse,
  GetProfileResponse,
} from '../model/types/types';
import { getProfileResponseSchema } from '../model/schemas';

export const getProfile = async (accountname: string): Promise<GetProfileResponse> => {
  const response = await axiosInstance.get(`/profile/${accountname}`);

  return parseWithSchema(getProfileResponseSchema, response.data, 'getProfile');
};

export const followUser = (accountname: string) =>
  axiosInstance.post<FollowResponse>(`/profile/${accountname}/follow`);

export const unfollowUser = (accountname: string) =>
  axiosInstance.delete<FollowResponse>(`/profile/${accountname}/unfollow`);

export const getFollowingList = (accountname: string) =>
  axiosInstance.get<FollowingListResponse>(`/profile/${accountname}/following`);

export const getFollowerList = (accountname: string) =>
  axiosInstance.get<FollowerListResponse>(`/profile/${accountname}/follower`);
