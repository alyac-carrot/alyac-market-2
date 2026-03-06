export type User = {
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

export type MyInfoResponse = {
  user: User;
};

export type UpdateProfileBody = {
  username: string;
  accountname: string;
  intro: string;
  image: string;
};

export type UpdateProfileResponse = {
  user: User;
};
