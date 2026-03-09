export { useUserProductsQuery } from './hooks/useUserProductsQuery';
export { useProductDetailQuery } from './hooks/useProductDetailQuery';
export { productQueryKeys } from './model/queries/queries';
export { getUserProducts, getProductDetail, createProduct, updateProduct } from './api/productApi';
export { useCreateProduct } from './hooks/useCreateProduct';
export { useUpdateProduct } from './hooks/useUpdateProduct';

export type {
  Product,
  GetUserProductsResponse,
  GetProductDetailResponse,
  CreateProductRequest,
  CreateProductResponse,
  UpdateProductRequest,
  UpdateProductResponse,
} from './model/types';
