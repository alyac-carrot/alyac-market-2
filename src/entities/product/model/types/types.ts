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
