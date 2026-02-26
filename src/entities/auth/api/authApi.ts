import axiosInstance from '@/shared/api/axios';

export type SignInBody = {
  email: string;
  password: string;
};

export type User = {
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
};

export type SignInResponse = {
  user: User & {
    accessToken: string;
    refreshToken: string;
  };
};

export type MyInfoResponse = {
  user: User;
};

export const signIn = (body: SignInBody) =>
  axiosInstance.post<SignInResponse>('/api/user/signin', {
    user: body,
  });

export const getMyInfo = () => axiosInstance.get<MyInfoResponse>('/api/user/myinfo');
