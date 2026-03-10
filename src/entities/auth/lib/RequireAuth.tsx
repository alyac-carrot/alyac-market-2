import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useMeQuery } from '@/entities/user';
import { getToken } from '@/shared/lib';

export function RequireAuth() {
  const location = useLocation();
  const token = getToken();

  const { data, isLoading, isFetching, isError } = useMeQuery();

  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if ((isLoading || isFetching) && !data) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (isError) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
