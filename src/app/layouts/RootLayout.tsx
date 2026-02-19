import { useState } from 'react';

import { Outlet } from 'react-router-dom';

import { ChatIcon, HomeIcon, PostIcon, ProfileIcon } from '../../shared/ui/icons';

export default function RootLayout() {
  const [active, setActive] = useState('home');

  const base = 'flex flex-1 flex-col items-center justify-center gap-1 text-xs cursor-pointer';
  const icon = 'w-6 h-6';

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex h-14 items-center border-b px-4">
        <h1 className="text-lg font-extrabold">알약마켓 파트</h1>
      </header>

      {/* Page */}
      <main className="pb-[72px]">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed right-0 bottom-0 left-0 flex h-[72px] border-t bg-white">
        <div
          onClick={() => setActive('home')}
          className={`${base} ${active === 'home' ? 'text-green-500' : 'text-zinc-400'}`}
        >
          <HomeIcon className={icon} />
          <span>홈</span>
        </div>

        <div
          onClick={() => setActive('chat')}
          className={`${base} ${active === 'chat' ? 'text-green-500' : 'text-zinc-400'}`}
        >
          <ChatIcon className={icon} />
          <span>채팅</span>
        </div>

        <div
          onClick={() => setActive('write')}
          className={`${base} ${active === 'write' ? 'text-green-500' : 'text-zinc-400'}`}
        >
          <PostIcon className={icon} />
          <span>게시물</span>
        </div>

        <div
          onClick={() => setActive('profile')}
          className={`${base} ${active === 'profile' ? 'text-green-500' : 'text-zinc-400'}`}
        >
          <ProfileIcon className={icon} />
          <span>프로필</span>
        </div>
      </nav>
    </div>
  );
}
