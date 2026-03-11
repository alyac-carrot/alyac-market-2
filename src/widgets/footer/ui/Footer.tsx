import { NavLink } from 'react-router-dom';

import {
  ChatIcon,
  ChatIconFill,
  HomeIcon,
  HomeIconFill,
  PostCreateIcon,
  ProfileIcon,
  ProfileIconFill,
} from '@/assets/icon';

const footerLinkClassName =
  'flex h-full min-w-16 flex-col items-center justify-center rounded-xl px-3 transition-colors hover:bg-accent hover:text-accent-foreground';

const footerLabelClassName = (isActive: boolean) =>
  isActive ? 'text-xs text-green-500' : 'text-xs text-zinc-500';

export function Footer() {
  return (
    <footer className="bg-background fixed right-0 bottom-0 left-0 h-16 border-t">
      <nav className="mx-auto flex h-full items-center justify-around px-2">
        <NavLink to="/feed" className={footerLinkClassName}>
          {({ isActive }) => (
            <>
              {isActive ? <HomeIconFill className="h-6 w-6" /> : <HomeIcon className="h-6 w-6" />}
              <span className={footerLabelClassName(isActive)}>홈</span>
            </>
          )}
        </NavLink>

        <NavLink to="/chat" className={footerLinkClassName}>
          {({ isActive }) => (
            <>
              {isActive ? <ChatIconFill className="h-6 w-6" /> : <ChatIcon className="h-6 w-6" />}
              <span className={footerLabelClassName(isActive)}>채팅</span>
            </>
          )}
        </NavLink>

        <NavLink to="/post-create" className={footerLinkClassName}>
          {({ isActive }) => (
            <>
              <PostCreateIcon className="h-6 w-6" />
              <span className={footerLabelClassName(isActive)}>게시물작성</span>
            </>
          )}
        </NavLink>

        <NavLink to="/profile" className={footerLinkClassName}>
          {({ isActive }) => (
            <>
              {isActive ? (
                <ProfileIconFill className="h-6 w-6" />
              ) : (
                <ProfileIcon className="h-6 w-6" />
              )}
              <span className={footerLabelClassName(isActive)}>프로필</span>
            </>
          )}
        </NavLink>
      </nav>
    </footer>
  );
}
