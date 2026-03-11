import axiosInstance from '@/shared/api/axios';

export type SignUpBody = {
  username: string;
  email: string;
  password: string;
  accountname: string;
  intro?: string;
  image?: string;
};

export type SignUpResponse = {
  message: string;
  user: {
    _id: string;
    username: string;
    email: string;
    accountname: string;
    intro: string;
    image: string;
  };
};

export const signUp = (body: SignUpBody) =>
  axiosInstance.post<SignUpResponse>('/user', { user: body });

export const checkEmail = (email: string) =>
  axiosInstance.post<{ ok: boolean; message: string }>('/user/emailvalid', {
    user: { email },
  });

export const checkAccountname = (accountname: string) =>
  axiosInstance.post<{ ok: boolean; message: string }>('/user/accountnamevalid', {
    user: { accountname },
  });
