import axiosInstance from '@/shared/api/axios';

import type {
  CreateProductRequest,
  CreateProductResponse,
  GetProductDetailResponse,
  GetUserProductsResponse,
  UpdateProductRequest,
  UpdateProductResponse,
} from '../model/types';

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

export const getProductDetail = (productId: string) =>
  axiosInstance.get<GetProductDetailResponse>(`/product/detail/${productId}`);

export const updateProduct = async (
  productId: string,
  data: UpdateProductRequest,
): Promise<UpdateProductResponse> => {
  const payload = {
    product: {
      itemName: data.itemName,
      price: data.price,
      link: data.link,
      itemImage: data.itemImage,
    },
  };

  const response = await axiosInstance.put<UpdateProductResponse>(`/product/${productId}`, payload);
  return response.data;
};
