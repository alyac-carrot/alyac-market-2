export { useUserProductsQuery } from './hooks/useUserProductsQuery';
export { productQueryKeys } from './model/queries/queries';
export { getUserProducts, createProduct } from './api/productApi';
export { useCreateProduct } from './hooks/useCreateProduct';

export type {
  Product,
  GetUserProductsResponse,
  CreateProductRequest,
  CreateProductResponse,
} from './model/types';
