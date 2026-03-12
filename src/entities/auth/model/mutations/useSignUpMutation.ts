import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { type SignUpBody, signUp } from '@/entities/auth/api/signUpApi';

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
