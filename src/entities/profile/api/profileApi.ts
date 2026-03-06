import axiosInstance from '@/shared/api/axios';

import type {
  FollowResponse,
  FollowerListResponse,
  FollowingListResponse,
  GetProfileResponse,
} from '../model/types/types';

export const getProfile = (accountname: string) =>
  axiosInstance.get<GetProfileResponse>(`/profile/${accountname}`);

export const followUser = (accountname: string) =>
  axiosInstance.post<FollowResponse>(`/profile/${accountname}/follow`);

export const unfollowUser = (accountname: string) =>
  axiosInstance.delete<FollowResponse>(`/profile/${accountname}/unfollow`);

export const getFollowingList = (accountname: string) =>
  axiosInstance.get<FollowingListResponse>(`/profile/${accountname}/following`);

export const getFollowerList = (accountname: string) =>
  axiosInstance.get<FollowerListResponse>(`/profile/${accountname}/follower`);
