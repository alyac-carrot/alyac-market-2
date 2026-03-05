import { useMatch } from 'react-router-dom';

import { AppHeader } from './AppHeader';
import { FeedHeader } from './FeedHeader';
import { SearchHeader } from './SearchHeader';

export function Header() {
  const isSearch = useMatch('/search/*');
  const isChat = useMatch('/chat/*');
  const isProfile = useMatch('/profile/*');
  const isPost = useMatch('/post/*');

  const isFollowers = useMatch('/followers/*');
  const isFollowings = useMatch('/followings/*');

  if (isSearch) return <SearchHeader />;

  if (isFollowers) return <AppHeader title="Followers" />;
  if (isFollowings) return <AppHeader title="Followings" />;

  if (isChat || isProfile || isPost) return <AppHeader />;

  return <FeedHeader />;
}
