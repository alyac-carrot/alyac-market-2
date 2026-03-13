import { z } from 'zod';

import {
  createProductResponseSchema,
  deleteProductResponseSchema,
  getProductDetailResponseSchema,
  getUserProductsResponseSchema,
  productAuthorSchema,
  productFormSchema,
  productRequestSchema,
  productSchema,
  updateProductResponseSchema,
} from './schemas';

export type ProductAuthor = z.infer<typeof productAuthorSchema>;
export type ProductFormValues = z.infer<typeof productFormSchema>;
export type ProductRequest = z.infer<typeof productRequestSchema>;
export type Product = z.infer<typeof productSchema>;
export type GetUserProductsResponse = z.infer<typeof getUserProductsResponseSchema>;
export type CreateProductResponse = z.infer<typeof createProductResponseSchema>;
export type GetProductDetailResponse = z.infer<typeof getProductDetailResponseSchema>;
export type UpdateProductResponse = z.infer<typeof updateProductResponseSchema>;
export type DeleteProductResponse = z.infer<typeof deleteProductResponseSchema>;

export type CreateProductRequest = {
  itemName: string;
  price: number;
  link: string;
  itemImage: string;
};

export type UpdateProductRequest = CreateProductRequest;
