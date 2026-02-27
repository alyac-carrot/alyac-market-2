export interface ProductAuthor {
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
}

export interface UserProduct {
  id: string;
  itemName: string;
  price: number;
  link: string;
  itemImage: string; // "uploadFiles/xxx.png"
  authorId: string;
  createdAt: string;
  author: ProductAuthor;
}

export interface GetUserProductsResponse {
  count: number;
  product: UserProduct[];
}
