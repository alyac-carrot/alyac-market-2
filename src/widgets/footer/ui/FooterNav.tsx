import { NavLink } from 'react-router-dom';

<<<<<<< HEAD
import { ChatIcon, HomeIcon, PostCreateIcon, ProfileIcon } from '@/assets/icon';

export function Footer() {
  return (
    <footer className="bg-background fixed right-0 bottom-0 left-0 border-t">
      <nav className="mx-auto flex h-16 max-w-3xl items-center justify-around">
        <NavLink to="/" end className="flex flex-col items-center">
          <HomeIcon className="h-6 w-6" />
          <span className="text-xs">홈</span>
=======
import {
  HomeIcon,
  HomeIconFill,
  ChatIcon,
  ChatIconFill,
  PostCreateIcon,
  ProfileIcon,
  ProfileIconFill,
} from '@/assets/icon';

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-16 border-t bg-background">
      <nav className="mx-auto flex h-full items-center justify-around">

        <NavLink to="/" className="flex flex-col items-center">
          {({ isActive }) => (
            <>
              {isActive ? (
                <HomeIconFill className="h-6 w-6" />
              ) : (
                <HomeIcon className="h-6 w-6" />
              )}
              <span className="text-xs">홈</span>
            </>
          )}
>>>>>>> develop
        </NavLink>

        <NavLink to="/chat" className="flex flex-col items-center">
          {({ isActive }) => (
            <>
              {isActive ? (
                <ChatIconFill className="h-6 w-6" />
              ) : (
                <ChatIcon className="h-6 w-6" />
              )}
              <span className="text-xs">채팅</span>
            </>
          )}
        </NavLink>

        <NavLink to="/post-create" className="flex flex-col items-center">
            <>
              <PostCreateIcon className="h-6 w-6" />
              <span className="text-xs">게시물 작성</span>
            </>      
        </NavLink>

        <NavLink to="/profile" className="flex flex-col items-center">
<<<<<<< HEAD
          <ProfileIcon className="mb-1 h-6 w-6" />
          <span className="text-xs">프로필</span>
=======
          {({ isActive }) => (
            <>
              {isActive ? (
                <ProfileIconFill className="h-6 w-6" />
              ) : (
                <ProfileIcon className="h-6 w-6" />
              )}
              <span className="text-xs">프로필</span>
            </>
          )}
>>>>>>> develop
        </NavLink>
      </nav>
    </footer>
  );
}