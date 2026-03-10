import { type ReactNode } from 'react';

import { type FallbackProps, ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';

import { classifyError } from './globalErrorHandler';

interface ErrorBoundaryProps {
  children: ReactNode;
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const classifiedError = classifyError(error);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Alert variant="destructive" className="max-w-md">
        <AlertTitle className="text-lg font-bold">오류가 발생했습니다.</AlertTitle>
        <AlertDescription className="mt-2 text-sm">
          <p className="mb-4">
            {classifiedError.type === 'network'
              ? '네트워크 연결 상태를 확인해주세요.'
              : classifiedError.message || '예기치 못한 문제가 발생했습니다.'}
          </p>
          <Button variant="outline" onClick={resetErrorBoundary} className="w-full">
            다시 시도
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return <ReactErrorBoundary FallbackComponent={ErrorFallback}>{children}</ReactErrorBoundary>;
}
