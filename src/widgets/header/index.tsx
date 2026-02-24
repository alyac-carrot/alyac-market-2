import { useLocation } from 'react-router-dom';

import { AppHeader } from './ui/AppHeader';
import { FeedHeader } from './ui/FeedHeader';
import { SearchHeader } from './ui/SearchHeader';

export function Header() {
  const { pathname } = useLocation();

  if (pathname.startsWith('/search')) {
    return <SearchHeader />;
  }

  if (pathname.startsWith('/chat') || pathname.startsWith('/profile')) {
    return <AppHeader />;
  }

  return <FeedHeader />;
}
