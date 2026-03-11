import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { getSignInErrorMessage, useSignInMutation } from '@/entities/auth';

import { type SignInFormValues, signInSchema } from './schemas';

export function useSignInForm() {
  const signInMutation = useSignInMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (values: SignInFormValues) => {
    signInMutation.mutate({
      email: values.email.trim(),
      password: values.password.trim(),
    });
  };

  const loading = signInMutation.isPending;
  const canSubmit = isValid && !loading;

  const bannerError = signInMutation.error ? getSignInErrorMessage(signInMutation.error) : null;

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    loading,
    canSubmit,
    bannerError,
    onSubmit,
  };
}
