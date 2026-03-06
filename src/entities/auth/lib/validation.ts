export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const validateEmailLive = (value: string): string | undefined => {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (!isValidEmail(trimmed)) return '올바른 이메일 형식을 입력해 주세요';
  return undefined;
};

export const validateEmailOnSubmit = (value: string): string | undefined => {
  const trimmed = value.trim();
  if (!trimmed) return '이메일을 입력해 주세요';
  if (!isValidEmail(trimmed)) return '올바른 이메일 형식을 입력해 주세요';
  return undefined;
};

export const validatePasswordRequiredLive = (value: string): string | undefined => {
  const trimmed = value.trim();
  if (!trimmed) return '비밀번호를 입력해 주세요';
  return undefined;
};

export const validatePasswordRequiredOnSubmit = (value: string): string | undefined => {
  const trimmed = value.trim();
  if (!trimmed) return '비밀번호를 입력해 주세요';
  return undefined;
};
