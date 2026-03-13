
import axiosInstance from '@/shared/api/axios';

import { type SignInBody, type SignInResponse } from '../model/type';
import { signInResponseSchema } from '../model/schemas';

export const signIn = async (body: SignInBody): Promise<SignInResponse> => {
  const response = await axiosInstance.post('/user/signin', {
    user: body,
  });

  const result = signInResponseSchema.safeParse(response.data);

  if (!result.success) {
    console.error('[zod:signIn]', result.error.flatten());
    throw new Error('로그인 응답 데이터 형식이 올바르지 않습니다.');
  }

  return result.data;
};
