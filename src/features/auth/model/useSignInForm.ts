import { useForm } from 'react-hook-form';

import { getSignInErrorMessage, useSignInMutation } from '@/entities/auth';

type SignInFormValues = {
  email: string;
  password: string;
};

export function useSignInForm() {
  const signInMutation = useSignInMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormValues>({
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
