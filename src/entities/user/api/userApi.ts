import axiosInstance from '@/shared/api/axios';
import { parseWithSchema } from '@/shared/lib';

import type { MyInfoResponse, UpdateProfileBody, UpdateProfileResponse } from '../model/types/types';
import { myInfoResponseSchema, updateProfileResponseSchema } from '../model/schemas';

export const getMyInfo = async (): Promise<MyInfoResponse> => {
  const response = await axiosInstance.get('/user/myinfo');

  return parseWithSchema(myInfoResponseSchema, response.data, 'getMyInfo');
};

export const searchUsers = (keyword: string) =>
  axiosInstance.get<unknown>('/user/search', {
    params: { keyword },
  });

export const updateMyProfile = async (body: UpdateProfileBody): Promise<UpdateProfileResponse> => {
  const response = await axiosInstance.put('/user', {
    user: body,
  });

  return parseWithSchema(updateProfileResponseSchema, response.data, 'updateMyProfile');
};
