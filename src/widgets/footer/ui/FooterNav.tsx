import { NavLink } from 'react-router-dom';
import { Home, MessageCircle, PlusSquare, User } from 'lucide-react';

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t bg-background">
      <nav className="mx-auto flex h-16 max-w-3xl items-center justify-around">

        <NavLink to="/feed" className="flex flex-col items-center">
          <Home className="h-6 w-6" />
          <span className="text-xs">홈</span>
        </NavLink>

        <NavLink to="/chat" className="flex flex-col items-center">
          <MessageCircle className="h-6 w-6" />
          <span className="text-xs">채팅</span>
        </NavLink>

        <NavLink to="/post-create" className="flex flex-col items-center">
          <PlusSquare className="h-6 w-6" />
          <span className="text-xs">게시물 작성</span>
        </NavLink>

        <NavLink to="/profile" className="flex flex-col items-center">
          <User className="h-6 w-6 mb-1" />
          <span className="text-xs ">프로필</span>
        </NavLink>

      </nav>
    </footer>
  );
}
