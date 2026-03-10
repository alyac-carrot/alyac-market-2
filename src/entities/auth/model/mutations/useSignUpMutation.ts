import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { type SignUpBody, signUp } from '@/entities/auth/api/signUpApi';
import { classifyError } from '@/shared/lib/error-handling/globalErrorHandler';

const getErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err) && err.response?.status === 400) {
    return '입력값을 확인해 주세요.';
  }
  const errorObj = classifyError(err);
  return errorObj.message || '회원가입에 실패했습니다.';
};

export function useSignUpMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: SignUpBody) => signUp(body),
    retry: false,
    onSuccess: () => {
      // After sign-up, redirect to sign-in so the user can log in
      navigate('/auth/signin', { replace: true });
    },
  });
}

export { getErrorMessage as getSignUpErrorMessage };
