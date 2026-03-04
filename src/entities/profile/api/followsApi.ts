import axiosInstance from '@/shared/api/axios';

export type FollowUser = {
  _id: string;
  username: string;
  email: string;
  accountname: string;
  intro: string;
  image: string;
  following: string[];
  follower: string[];
  followerCount: number;
  followingCount: number;
  isfollow?: boolean;
};

export type FollowersResponse = {
  follower: FollowUser[];
};

export type FollowingsResponse = {
  following: FollowUser[];
};

export const getFollowers = async (accountname: string, limit = 10, skip = 0) => {
  const res = await axiosInstance.get<FollowersResponse>(`/profile/${accountname}/follower`, {
    params: { limit, skip },
  });
  return res.data;
};

export const getFollowings = async (accountname: string, limit = 10, skip = 0) => {
  const res = await axiosInstance.get<FollowingsResponse>(`/profile/${accountname}/following`, {
    params: { limit, skip },
  });
  return res.data;
};
