import { useNavigate } from 'react-router-dom';

import { ArrowLeftIcon } from '@/shared/ui/icons';

type ChatItem = {
  id: string;
  name: string;
  lastMessage: string;
  date: string;
  unread?: boolean;
};

const MOCK_CHATS: ChatItem[] = [
  {
    id: '1',
    name: '이스트 시큐리티',
    lastMessage: '화이팅',
    date: '2020.10.25',
    unread: true,
  },
  { id: '2', name: '알약 클라우드 이스트 시큐리티', lastMessage: '테스팅', date: '2020.10.25' },
  { id: '3', name: '보안 닥터스 알약', lastMessage: '배고픔', date: '2020.10.25' },
];

export function ChatListPage() {
  const nav = useNavigate();

  return (
    <div className="px-4 pt-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => nav(-1)}
          className="grid h-10 w-10 place-items-center rounded-full text-zinc-700 active:scale-95"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h2 className="text-base font-bold">돌아가기</h2>

        <div className="ml-auto text-zinc-500">⋮</div>
      </div>

      <ul className="mt-4 space-y-4">
        {MOCK_CHATS.map((c) => (
          <li
            key={c.id}
            onClick={() => nav(`/chat/${c.id}`)}
            className="flex cursor-pointer items-center gap-3"
          >
            {/* 프로필 */}
            <div className="relative h-11 w-11 rounded-full bg-zinc-200">
              {c.unread && (
                <span className="absolute top-4 -left-1 h-2.5 w-2.5 rounded-full bg-green-500" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold text-zinc-900">{c.name}</p>
                <span className="ml-auto text-[11px] text-zinc-400">{c.date}</span>
              </div>
              <p className="truncate text-xs text-zinc-500">{c.lastMessage}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
