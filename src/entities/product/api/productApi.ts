import axiosInstance from '@/shared/api/axios';

import type { CreateProductRequest, CreateProductResponse, GetUserProductsResponse } from '../model/types';

export const getUserProducts = (accountname: string) =>
  axiosInstance.get<GetUserProductsResponse>(`/product/${accountname}`);

export const createProduct = async (data: CreateProductRequest): Promise<CreateProductResponse> => {
  const payload = {
    product: {
      itemName: data.itemName,
      price: data.price,
      link: data.link ?? '',
      itemImage: data.itemImage,
    },
  };

  const response = await axiosInstance.post<CreateProductResponse>('/product', payload);

  return response.data;
};
