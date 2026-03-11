import { z } from 'zod';

import { zodAccountnameSchema, zodEmailSchema, zodImageUrlSchema } from '@/shared/lib';

export const productAuthorSchema = z.object({
  _id: z.string(),
  username: z.string(),
  email: zodEmailSchema.optional(),
  accountname: zodAccountnameSchema,
  intro: z.string().default(''),
  image: zodImageUrlSchema.default(''),
  isfollow: z.boolean().optional(),
  following: z.array(z.string()).default([]),
  follower: z.array(z.string()).default([]),
  followerCount: z.number().default(0),
  followingCount: z.number().default(0),
});

export const productSchema = z.object({
  id: z.string(),
  itemName: z.string(),
  price: z.number(),
  link: z.string().default(''),
  itemImage: zodImageUrlSchema.default(''),
  authorId: z.string().optional(),
  createdAt: z.string().optional(),
  author: productAuthorSchema,
});

export const getUserProductsResponseSchema = z.object({
  count: z.number().default(0),
  product: z.array(productSchema).default([]),
});

export const createProductResponseSchema = z.object({
  product: productSchema,
});

export const getProductDetailResponseSchema = z.object({
  product: productSchema,
});

export const updateProductResponseSchema = z.object({
  product: productSchema,
});

export const deleteProductResponseSchema = z.object({
  message: z.string().optional(),
});

export type ProductAuthor = z.infer<typeof productAuthorSchema>;
export type Product = z.infer<typeof productSchema>;
export type GetUserProductsResponse = z.infer<typeof getUserProductsResponseSchema>;
export type CreateProductResponse = z.infer<typeof createProductResponseSchema>;
export type GetProductDetailResponse = z.infer<typeof getProductDetailResponseSchema>;
export type UpdateProductResponse = z.infer<typeof updateProductResponseSchema>;
export type DeleteProductResponse = z.infer<typeof deleteProductResponseSchema>;
