import axiosInstance from '@/shared/api/axios';

export type SignInBody = {
  email: string;
  password: string;
};

export type SignUpBody = {
  email: string;
  password: string;
  username: string;
  accountname: string;
};

export const signIn = (body: SignInBody) =>
  axiosInstance.post('/api/user/signin', {
    user: body,
  });

export const signUp = (body: SignUpBody) =>
  axiosInstance.post('/api/user', {
    user: body,
  });

export const getMyInfo = () => axiosInstance.get('/api/user/myinfo');

export const checkEmail = (email: string) => axiosInstance.post('/api/user/emailvalid', { email });

export const checkAccountName = (accountname: string) =>
  axiosInstance.post('/api/user/accountnamevalid', { accountname });
