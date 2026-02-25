import { useMatch } from 'react-router-dom';

import { AppHeader } from './ui/AppHeader';
import { FeedHeader } from './ui/FeedHeader';
import { SearchHeader } from './ui/SearchHeader';

export function Header() {
  const isSearch = useMatch('/search');
  const isChat = useMatch('/chat/*');
  const isProfile = useMatch('/profile/*');

  if (isSearch) return <SearchHeader />;
  if (isChat || isProfile) return <AppHeader />;
  return <FeedHeader />;
}
