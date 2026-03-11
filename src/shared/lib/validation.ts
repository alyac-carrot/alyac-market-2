import { type ZodType, z } from 'zod';

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const accountnamePattern = /^[a-zA-Z0-9_.]+$/;

export const emailRule = {
  required: '*이메일을 입력해 주세요.',
  pattern: {
    value: emailPattern,
    message: '*올바른 이메일 형식을 입력해 주세요.',
  },
};

export const passwordRule = {
  required: '*비밀번호를 입력해 주세요.',
  minLength: {
    value: 6,
    message: '*비밀번호는 6자 이상 30자 이하여야 합니다.',
  },
  maxLength: {
    value: 30,
    message: '*비밀번호는 6자 이상 30자 이하여야 합니다.',
  },
};

export const usernameRule = {
  required: '*사용자 이름을 입력해 주세요.',
  minLength: {
    value: 2,
    message: '*2자 이상 입력해 주세요.',
  },
  maxLength: {
    value: 10,
    message: '*10자 이하로 입력해 주세요.',
  },
};

export const accountnameRule = {
  required: '*계정 ID를 입력해 주세요.',
  maxLength: {
    value: 20,
    message: '*20자 이하로 입력해 주세요.',
  },
  pattern: {
    value: accountnamePattern,
    message: '*영문, 숫자, 밑줄(_), 마침표(.)만 사용할 수 있습니다.',
  },
};

export const introRule = {
  maxLength: {
    value: 60,
    message: '*60자 이하로 입력해 주세요.',
  },
};

export const zodEmailSchema = z.email({
  message: '올바른 이메일 형식을 입력해 주세요.',
});

export const zodUsernameSchema = z
  .string()
  .trim()
  .min(1, {
    message: '사용자 이름을 입력해 주세요.',
  })
  .min(2, {
    message: '2자 이상 입력해 주세요.',
  })
  .max(10, {
    message: '10자 이하로 입력해 주세요.',
  });

export const zodAccountnameSchema = z
  .string()
  .trim()
  .min(1, {
    message: '계정 ID를 입력해 주세요.',
  })
  .max(20, {
    message: '20자 이하로 입력해 주세요.',
  })
  .regex(accountnamePattern, {
    message: '영문, 숫자, 밑줄(_), 마침표(.)만 사용할 수 있습니다.',
  });

export const zodPasswordSchema = z
  .string()
  .trim()
  .min(1, {
    message: '비밀번호를 입력해 주세요.',
  })
  .min(6, {
    message: '비밀번호는 6자 이상 30자 이하여야 합니다.',
  })
  .max(30, {
    message: '비밀번호는 6자 이상 30자 이하여야 합니다.',
  });

export const zodIntroSchema = z.string().trim().max(60, {
  message: '60자 이하로 입력해 주세요.',
});

export const zodImageUrlSchema = z.union([
  z.url({
    message: '올바른 URL 형식을 입력해 주세요.',
  }),
  z.string().regex(/^\/?uploadFiles\/.+$/, {
    message: '올바른 이미지 경로를 입력해 주세요.',
  }),
  z.string().length(0),
]);

export function parseWithSchema<T>(schema: ZodType<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    console.error(`[zod:${label}]`, result.error.flatten());
    throw new Error('응답 데이터 형식이 올바르지 않습니다.');
  }

  return result.data;
}
