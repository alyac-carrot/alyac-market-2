import { z } from 'zod';

import {
  zodAccountnameSchema,
  zodIntroSchema,
  zodUsernameSchema,
} from '@/shared/lib';

export const profileUpdateSchema = z.object({
  username: zodUsernameSchema,
  accountname: zodAccountnameSchema,
  intro: zodIntroSchema,
});

export type ProfileUpdateFormValues = z.infer<typeof profileUpdateSchema>;
