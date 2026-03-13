export { useUserProductsQuery } from './model/queries/useUserProductsQuery';
export { useProductDetailQuery } from './model/queries/useProductDetailQuery';
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
export { productFormSchema, productRequestSchema } from './model/schemas';

export type {
  Product,
  ProductAuthor,
  ProductRequest,
  GetUserProductsResponse,
  GetProductDetailResponse,
  CreateProductRequest,
  CreateProductResponse,
  UpdateProductRequest,
  UpdateProductResponse,
  DeleteProductResponse,
} from './model/type';
export type { ProductFormValues } from './model/type';
