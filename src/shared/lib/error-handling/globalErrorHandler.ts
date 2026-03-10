import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import type { ApiErrorState } from '@/shared/api/axios';

/**
 * 전역적인 에러 메시지 매핑, 리트라이 정책 로직 등을 담당합니다.
 */

// TanStack Query 전역 에러/콜백 핸들러
export const queryErrorHandler = (error: unknown) => {
  const errorObj = classifyError(error);

  if (errorObj.type === 'auth') {
    // 401, 403 처리는 Axios 인터셉터 내부 token refresh 로직에서 대부분 처리되지만
    // 여기서 토스트 메시지를 띄우거나 부가 처리를 할 수 있습니다.
  } else if (errorObj.type === 'server') {
    toast.error('서버 에러가 발생했습니다.', {
      description: errorObj.message,
    });
  } else if (errorObj.type === 'network') {
    toast.error('네트워크 에러', {
      description: '인터넷 연결 상태를 확인해주세요.',
    });
  } else {
    toast.error('알 수 없는 에러가 발생했습니다.', {
      description: errorObj.message,
    });
  }
};

// 에러 객체를 분류해주는 헬퍼
export const classifyError = (error: unknown): ApiErrorState => {
  if (isAxiosError(error) && error.response) {
    const status = error.response.status;
    const message = error.response.data?.message || error.message;

    if (status === 401 || status === 403) {
      return { type: 'auth', status, message };
    }
    if (status >= 500) {
      return { type: 'server', status, message };
    }
    // 422 등 기타 상태 코드
    return { type: 'unknown', message };
  }

  if (isAxiosError(error) && error.request) {
    return { type: 'network', message: '네트워크 상태를 확인해주세요.' };
  }

  return { type: 'unknown', message: error instanceof Error ? error.message : '알 수 없는 오류' };
};

// 재시도(Retry) 정책
export const shouldRetry = (failureCount: number, error: unknown) => {
  const classified = classifyError(error);

  // 401, 403, 422 인증/클라이언트 에러 등은 재시도하지 않음
  if (classified.type === 'auth' || (isAxiosError(error) && error.response?.status === 422)) {
    return false;
  }

  // 네트워크 또는 500 이상의 서버 에러는 최대 3번까지 재시도
  if ((classified.type === 'network' || classified.type === 'server') && failureCount < 3) {
    return true;
  }

  return false;
};
