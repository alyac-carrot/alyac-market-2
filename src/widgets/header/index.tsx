// src/widgets/header/index.tsx
import { useLocation } from 'react-router-dom';
import { DefaultHeader } from './ui/DefaultHeader';
import { SearchHeader } from './ui/SearchHeader';

export function Header() {
  const { pathname } = useLocation();

  if (pathname.startsWith('/search')) {
    return <SearchHeader />;
  }

  return <DefaultHeader />;
}