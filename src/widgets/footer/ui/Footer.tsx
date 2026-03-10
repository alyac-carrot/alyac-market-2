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

export function Footer() {
  return (
    <footer className="bg-background fixed right-0 bottom-0 left-0 h-16 border-t">
      <nav className="mx-auto flex h-full items-center justify-around">
        <NavLink to="/feed" className="flex flex-col items-center">
          {({ isActive }) => (
            <>
              {isActive ? <HomeIconFill className="h-6 w-6" /> : <HomeIcon className="h-6 w-6" />}
              <span className={isActive ? 'text-xs text-green-500' : 'text-xs text-zinc-500'}>홈</span>
            </>
          )}
        </NavLink>

        <NavLink to="/chat" className="flex flex-col items-center">
          {({ isActive }) => (
            <>
              {isActive ? <ChatIconFill className="h-6 w-6" /> : <ChatIcon className="h-6 w-6" />}
              <span className={isActive ? 'text-xs text-green-500' : 'text-xs text-zinc-500'}>채팅</span>
            </>
          )}
        </NavLink>

        <NavLink to="/post-create" className="flex flex-col items-center">
          {({ isActive }) => (
            <>
              <PostCreateIcon className="h-6 w-6" />
              <span className={isActive ? 'text-xs text-green-500' : 'text-xs text-zinc-500'}>
                게시물작성
              </span>
            </>
          )}
        </NavLink>

        <NavLink to="/profile" className="flex flex-col items-center">
          {({ isActive }) => (
            <>
              {isActive ? (
                <ProfileIconFill className="h-6 w-6" />
              ) : (
                <ProfileIcon className="h-6 w-6" />
              )}
              <span className={isActive ? 'text-xs text-green-500' : 'text-xs text-zinc-500'}>
                프로필
              </span>
            </>
          )}
        </NavLink>
      </nav>
    </footer>
  );
}
