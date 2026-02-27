import axiosInstance from '@/shared/api/axios';

import type {
  FollowResponse,
  FollowerListResponse,
  FollowingListResponse,
  GetProfileResponse,
} from '../model/types';

export const getProfile = (accountname: string) =>
  axiosInstance.get<GetProfileResponse>(`/api/profile/${accountname}`);

export const followUser = (accountname: string) =>
  axiosInstance.post<FollowResponse>(`/api/profile/${accountname}/follow`);

export const unfollowUser = (accountname: string) =>
  axiosInstance.delete<FollowResponse>(`/api/profile/${accountname}/unfollow`);

export const getFollowingList = (accountname: string) =>
  axiosInstance.get<FollowingListResponse>(`/api/profile/${accountname}/following`);

export const getFollowerList = (accountname: string) =>
  axiosInstance.get<FollowerListResponse>(`/api/profile/${accountname}/follower`);
