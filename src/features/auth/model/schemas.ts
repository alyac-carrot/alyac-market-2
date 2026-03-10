import { z } from 'zod';

import { zodEmailSchema, zodPasswordSchema } from '@/shared/lib';

export const signInSchema = z.object({
  email: zodEmailSchema,
  password: zodPasswordSchema,
});

export type SignInFormValues = z.infer<typeof signInSchema>;
