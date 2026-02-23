import { useLocation } from 'react-router-dom';
import { FeedHeader } from './ui/FeedHeader';
import { SearchHeader } from './ui/SearchHeader';
import { AppHeader } from './ui/AppHeader';

export function Header() {
  const { pathname } = useLocation();

  if (pathname.startsWith('/search')) {
    return <SearchHeader />;
  }

  if (pathname.startsWith('/chat')) { 
    return <AppHeader />;
  }

  return <FeedHeader />;
}