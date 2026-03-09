export type ProductAuthor = {
  _id: string;
  username: string;
  email: string;
  accountname: string;
  intro: string;
  image: string;
  following: string[];
  follower: string[];
  followerCount: number;
  followingCount: number;
};

export type Product = {
  id: string;
  itemName: string;
  price: number;
  link: string;
  itemImage: string;
  authorId: string;
  createdAt: string;
  author: ProductAuthor;
};

export type GetUserProductsResponse = {
  count: number;
  product: Product[];
};

export type CreateProductRequest = {
  itemName: string;
  price: number;
  link: string;
  itemImage: string;
};

export type CreateProductResponse = {
  product: Product;
};

export type GetProductDetailResponse = {
  product: Product;
};

export type UpdateProductRequest = CreateProductRequest;

export type UpdateProductResponse = {
  product: Product;
};

export type DeleteProductResponse = {
  message?: string;
};

