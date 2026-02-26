import type { User } from '@/entities/user/model/types';
import axiosInstance from '@/shared/api/axios';

export type SignInBody = {
  email: string;
  password: string;
};

export type SignInResponse = {
  user: User & {
    accessToken: string;
    refreshToken: string;
  };
};

export const signIn = (body: SignInBody) =>
  axiosInstance.post<SignInResponse>('/api/user/signin', {
    user: body,
  });
