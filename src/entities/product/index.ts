export { useUserProductsQuery } from './hooks/useUserProductsQuery';
export { useProductDetailQuery } from './hooks/useProductDetailQuery';
export { productQueryKeys } from './model/queries/queries';
export {
  getUserProducts,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct,
} from './api/productApi';
export { useCreateProduct } from './hooks/useCreateProduct';
export { useUpdateProduct } from './hooks/useUpdateProduct';
export { useDeleteProduct } from './hooks/useDeleteProduct';
export { productRequestSchema } from './model/schemas';

export type {
  Product,
  GetUserProductsResponse,
  GetProductDetailResponse,
  CreateProductRequest,
  CreateProductResponse,
  UpdateProductRequest,
  UpdateProductResponse,
  DeleteProductResponse,
} from './model/types';
