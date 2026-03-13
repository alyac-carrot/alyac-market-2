import axiosInstance from '@/shared/api/axios';
import { parseWithSchema } from '@/shared/lib';

import {
  createProductResponseSchema,
  deleteProductResponseSchema,
  getProductDetailResponseSchema,
  getUserProductsResponseSchema,
  updateProductResponseSchema,
} from '../model/schemas';
import type {
  CreateProductRequest,
  CreateProductResponse,
  DeleteProductResponse,
  GetProductDetailResponse,
  GetUserProductsResponse,
  UpdateProductRequest,
  UpdateProductResponse,
} from '../model/type';

export const getUserProducts = async (accountname: string): Promise<GetUserProductsResponse> => {
  const response = await axiosInstance.get(`/product/${accountname}`);

  return parseWithSchema(getUserProductsResponseSchema, response.data, 'getUserProducts');
};

export const createProduct = async (data: CreateProductRequest): Promise<CreateProductResponse> => {
  const payload = {
    product: {
      itemName: data.itemName,
      price: data.price,
      link: data.link ?? '',
      itemImage: data.itemImage,
    },
  };

  const response = await axiosInstance.post('/product', payload);

  return parseWithSchema(createProductResponseSchema, response.data, 'createProduct');
};

export const getProductDetail = async (productId: string): Promise<GetProductDetailResponse> => {
  const response = await axiosInstance.get(`/product/detail/${productId}`);

  return parseWithSchema(getProductDetailResponseSchema, response.data, 'getProductDetail');
};

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

  const response = await axiosInstance.put(`/product/${productId}`, payload);
  return parseWithSchema(updateProductResponseSchema, response.data, 'updateProduct');
};

export const deleteProduct = async (productId: string): Promise<DeleteProductResponse> => {
  const response = await axiosInstance.delete(`/product/${productId}`);
  return parseWithSchema(deleteProductResponseSchema, response.data, 'deleteProduct');
};
