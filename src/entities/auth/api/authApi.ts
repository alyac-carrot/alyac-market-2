import { treeifyError } from 'zod';

import axiosInstance from '@/shared/api/axios';

import { type SignInResponse, signInResponseSchema } from '../model/schemas';

export type SignInBody = {
  email: string;
  password: string;
};

export const signIn = async (body: SignInBody): Promise<SignInResponse> => {
  const response = await axiosInstance.post('/user/signin', {
    user: body,
  });

  const result = signInResponseSchema.safeParse(response.data);

  if (!result.success) {
    console.error('[zod:signIn]', treeifyError(result.error));
    throw new Error('로그인 응답 데이터 형식이 올바르지 않습니다.');
  }

  return result.data;
};
