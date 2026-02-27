import axiosInstance from '@/shared/api/axios';

import type { MyInfoResponse } from '../model/types';

export const getMyInfo = () => axiosInstance.get<MyInfoResponse>('/user/myinfo');
