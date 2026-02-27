export type Profile = {
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
  isfollow?: boolean;
};

export type GetProfileResponse = {
  profile: Profile;
};

export type FollowResponse = {
  profile: Profile;
};

export type FollowingListResponse = {
  following: Profile[];
};

export type FollowerListResponse = {
  follower: Profile[];
};
