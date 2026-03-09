import { useNavigate } from 'react-router-dom';

import { Header, PageWithHeader } from '@/widgets/header';

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
    lastMessage: '안녕하세요',
    date: '2020.10.25',
    unread: true,
  },
  { id: '2', name: '알약 클라우드 이스트 시큐리티', lastMessage: '테스트', date: '2020.10.25' },
  { id: '3', name: '보안 닥터스 알약', lastMessage: '반가워요', date: '2020.10.25' },
];

export default function ChatListPage() {
  const nav = useNavigate();

  return (
    <PageWithHeader className="px-4" header={<Header title="채팅" />}>
      <ul className="mt-4 space-y-4">
        {MOCK_CHATS.map((c) => (
          <li
            key={c.id}
            onClick={() => nav(`/chat/${c.id}`)}
            className="flex cursor-pointer items-center gap-3"
          >
            <div className="relative h-11 w-11 rounded-full bg-zinc-200 dark:bg-zinc-700">
              {c.unread && <span className="absolute top-4 -left-1 h-2.5 w-2.5 rounded-full bg-green-500" />}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-foreground truncate text-sm font-semibold">{c.name}</p>
                <span className="ml-auto text-[11px] text-zinc-400 dark:text-zinc-500">{c.date}</span>
              </div>
              <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{c.lastMessage}</p>
            </div>
          </li>
        ))}
      </ul>
    </PageWithHeader>
  );
}
