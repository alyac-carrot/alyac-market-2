export type {
  CreateProductResponse,
  DeleteProductResponse,
  GetProductDetailResponse,
  GetUserProductsResponse,
  Product,
  ProductAuthor,
  UpdateProductResponse,
} from './schemas';

export type CreateProductRequest = {
  itemName: string;
  price: number;
  link: string;
  itemImage: string;
};

export type UpdateProductRequest = CreateProductRequest;

