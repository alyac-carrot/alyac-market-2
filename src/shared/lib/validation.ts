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
    message: '*비밀번호는 6자 이상이어야 합니다.',
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
    message: '*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.',
  },
};

export const introRule = {
  maxLength: {
    value: 60,
    message: '*60자 이하로 입력해 주세요.',
  },
};
