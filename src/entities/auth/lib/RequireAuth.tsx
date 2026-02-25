import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { getToken } from '@/entities/auth/lib/token';

export function RequireAuth() {
  const location = useLocation();
  const token = getToken();

  if (!token) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
