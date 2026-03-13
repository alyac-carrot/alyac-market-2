import { z } from 'zod';

import { authUserSchema, signInResponseSchema, signInUserSchema } from './schemas';

export type SignInBody = {
  email: string;
  password: string;
};

export type SignUpBody = {
  username: string;
  email: string;
  password: string;
  accountname: string;
  intro?: string;
  image?: string;
};

export type SignUpResponse = {
  message: string;
  user: {
    _id: string;
    username: string;
    email: string;
    accountname: string;
    intro: string;
    image: string;
  };
};

export type AuthUser = z.infer<typeof authUserSchema>;
export type SignInUser = z.infer<typeof signInUserSchema>;
export type SignInResponse = z.infer<typeof signInResponseSchema>;
