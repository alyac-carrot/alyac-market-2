import axiosInstance from '@/shared/api/axios';

import type { SignUpBody, SignUpResponse } from '../model/type';

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
