import { z } from 'zod';

import { zodAccountnameSchema, zodEmailSchema, zodImageUrlSchema } from '@/shared/lib';

export const productItemNameSchema = z
  .string()
  .trim()
  .min(2, { message: '상품명은 2자 이상 입력해 주세요.' })
  .max(15, { message: '상품명은 15자 이하로 입력해 주세요.' });

export const productPriceSchema = z.number().min(1, {
  message: '가격은 1원 이상이어야 합니다.',
});

export const productLinkSchema = z
  .string()
  .trim()
  .min(1, { message: '판매 링크를 입력해 주세요.' })
  .refine((value) => /^https?:\/\//.test(value), {
    message: '판매 링크는 http:// 또는 https://로 시작해야 합니다.',
  });

export const productImageSchema = zodImageUrlSchema.refine((value) => value.trim().length > 0, {
  message: '상품 이미지를 등록해 주세요.',
});

export const productRequestSchema = z.object({
  itemName: productItemNameSchema,
  price: productPriceSchema,
  link: productLinkSchema,
  itemImage: productImageSchema,
});

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
export type ProductRequest = z.infer<typeof productRequestSchema>;
export type Product = z.infer<typeof productSchema>;
export type GetUserProductsResponse = z.infer<typeof getUserProductsResponseSchema>;
export type CreateProductResponse = z.infer<typeof createProductResponseSchema>;
export type GetProductDetailResponse = z.infer<typeof getProductDetailResponseSchema>;
export type UpdateProductResponse = z.infer<typeof updateProductResponseSchema>;
export type DeleteProductResponse = z.infer<typeof deleteProductResponseSchema>;
