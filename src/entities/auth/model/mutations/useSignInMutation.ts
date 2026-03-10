import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { type SignInBody, signIn } from '@/entities/auth/api/authApi';
import { queryKeys, saveToken } from '@/shared/lib';
import { classifyError } from '@/shared/lib/error-handling/globalErrorHandler';

export function getSignInErrorMessage(err: unknown) {
  if (axios.isAxiosError(err) && err.response?.status === 422) {
    return '이메일 또는 비밀번호가 일치하지 않습니다.';
  }
  const errorObj = classifyError(err);
  return errorObj.message || '로그인에 실패했습니다.';
}

export function useSignInMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: SignInBody) => signIn(body),
    retry: false,
    onSuccess: (res) => {
      const user = res.data.user;

      saveToken(user.accessToken, user.refreshToken);

      const me = {
        _id: user._id,
        username: user.username,
        email: user.email,
        accountname: user.accountname,
        intro: user.intro,
        image: user.image,
        following: user.following,
        follower: user.follower,
        followerCount: user.followerCount,
        followingCount: user.followingCount,
      };

      queryClient.setQueryData(queryKeys.me, { user: me });

      navigate('/feed', { replace: true });
    },
  });
}
