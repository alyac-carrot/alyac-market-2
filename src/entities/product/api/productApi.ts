import axiosInstance from '@/shared/api/axios';

import type { GetUserProductsResponse } from '../model/types';

export const getUserProducts = (accountname: string) =>
  axiosInstance.get<GetUserProductsResponse>(`/api/product/${accountname}`);
