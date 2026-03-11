export type { MyInfoResponse, UpdateProfileResponse, User } from '../schemas';

export type UpdateProfileBody = {
  username: string;
  accountname: string;
  intro: string;
  image: string;
};
