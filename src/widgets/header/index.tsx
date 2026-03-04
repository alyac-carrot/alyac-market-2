// import { useMatch } from 'react-router-dom';
// import { AppHeader } from './ui/AppHeader';
// import { FeedHeader } from './ui/FeedHeader';
// import { SearchHeader } from './ui/SearchHeader';
// export function Header() {
//   const isSearch = useMatch('/search/*');
//   const isChat = useMatch('/chat/*');
//   const isProfile = useMatch('/profile/*');
//   const isPost = useMatch('/post/*');
//   if (isSearch) return <SearchHeader />;
//   if (isChat || isProfile || isPost) return <AppHeader />;
//   return <FeedHeader />;
// }
import { useMatch } from 'react-router-dom';

import { AppHeader } from './ui/AppHeader';
import { FeedHeader } from './ui/FeedHeader';
import { SearchHeader } from './ui/SearchHeader';

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
