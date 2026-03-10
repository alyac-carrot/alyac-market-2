import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { type SignInBody, signIn } from '@/entities/auth/api/authApi';
import { saveToken } from '@/entities/auth/lib/token';
import { queryKeys } from '@/shared/lib';

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null;

const getErrorMessage = (data: unknown): string | undefined => {
  if (!isObject(data)) return undefined;
  const msg = data.message;
  return typeof msg === 'string' ? msg : undefined;
};

export function getSignInErrorMessage(err: unknown) {
  if (axios.isAxiosError(err)) {
    if (err.response?.status === 422) return '이메일 또는 비밀번호가 일치하지 않습니다.';
    return getErrorMessage(err.response?.data) ?? '로그인에 실패했습니다.';
  }
  return '로그인에 실패했습니다.';
}

export function useSignInMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: SignInBody) => signIn(body),
    retry: false,
    onSuccess: (response) => {
      const user = response.user;

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
