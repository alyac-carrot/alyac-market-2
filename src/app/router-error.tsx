import { useEffect } from 'react';

import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

function isChunkLoadError(error: unknown) {
  if (!(error instanceof Error)) return false;

  const message = error.message.toLowerCase();
  return (
    message.includes('failed to fetch dynamically imported module') ||
    message.includes('importing a module script failed') ||
    message.includes('chunk')
  );
}

export function RouterErrorPage() {
  const error = useRouteError();

  useEffect(() => {
    if (!isChunkLoadError(error)) return;

    const retryKey = 'lazy-import-reloaded';
    if (sessionStorage.getItem(retryKey) === '1') return;

    sessionStorage.setItem(retryKey, '1');
    window.location.reload();
  }, [error]);

  let title = '페이지를 불러오지 못했습니다.';
  let description = '잠시 후 다시 시도해 주세요.';

  if (isRouteErrorResponse(error) && error.status === 404) {
    title = '페이지를 찾을 수 없습니다.';
    description = '주소를 다시 확인해 주세요.';
  } else if (isChunkLoadError(error)) {
    description = '배포가 갱신되어 페이지를 다시 불러오는 중입니다. 계속되면 새로고침해 주세요.';
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 dark:bg-zinc-950">
      <div className="max-w-sm text-center">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{title}</h1>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 rounded-full bg-green-500 px-6 py-3 text-sm font-medium text-white hover:bg-green-600"
        >
          새로고침
        </button>
      </div>
    </div>
  );
}
