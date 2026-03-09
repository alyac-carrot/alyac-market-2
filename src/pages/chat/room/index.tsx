import { useEffect, useMemo, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import type { Msg } from '@/entities/chat';
import { ChatMessage } from '@/features/chat';
import { Header, PageWithHeader } from '@/widgets/header';

export default function ChatRoomPage() {
  const nav = useNavigate();

  const [openSheet, setOpenSheet] = useState(false);
  const [input, setInput] = useState('');

  const meAvatarUrl = '/mascot.png';
  const themAvatarUrl = '/mascot.png';

  const [messages, setMessages] = useState<Msg[]>([
    { id: 'a', from: 'them', text: '테스트용 말', time: '12:39' },
    { id: 'b', from: 'them', text: '테스트 확인입니다', time: '12:44' },
    { id: 'c', from: 'me', text: '알겠습니다', time: '12:50' },
    { id: 'e', from: 'them', text: '사진도 부탁요', time: '12:55' },
  ]);

  const listRef = useRef<HTMLDivElement | null>(null);
  const canSend = input.trim().length > 0;

  const scrollToBottom = () => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  };

  const onSend = () => {
    if (!canSend) return;

    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), from: 'me', text: input.trim(), time: '지금' },
    ]);
    setInput('');
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  const grouped = useMemo(() => messages, [messages]);

  return (
    <PageWithHeader
      className="flex min-h-screen flex-col"
      header={<Header title="채팅방" showBackButton />}
      contentClassName="flex flex-1 flex-col"
    >
      <div ref={listRef} className="bg-background flex-1 space-y-3 overflow-auto px-4 py-4">
        {grouped.map((m) => (
          <ChatMessage
            key={m.id}
            message={m}
            meAvatarUrl={meAvatarUrl}
            themAvatarUrl={themAvatarUrl}
          />
        ))}
      </div>

      <div className="border-border bg-card border-t px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="bg-muted h-9 w-9 shrink-0 overflow-hidden rounded-full">
            {meAvatarUrl ? (
              <img src={meAvatarUrl} alt="me" className="h-full w-full object-cover" />
            ) : null}
          </div>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지 입력하기..."
            className="bg-muted h-11 flex-1 rounded-full px-5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSend();
            }}
          />

          <button
            type="button"
            onClick={onSend}
            disabled={!canSend}
            className={`text-sm font-semibold transition-transform duration-150 ${
              canSend
                ? 'cursor-pointer text-green-600 active:scale-90'
                : 'text-muted-foreground cursor-not-allowed'
            } `}
          >
            전송
          </button>
        </div>
      </div>

      {openSheet && (
        <div className="fixed inset-0 z-50">
          <button
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpenSheet(false)}
            aria-label="닫기"
          />
          <div className="bg-card absolute right-0 bottom-0 left-0 rounded-t-2xl p-4">
            <div className="bg-muted mx-auto mb-3 h-1.5 w-12 rounded-full" />
            <button
              className="text-foreground w-full rounded-xl py-3 text-left text-sm font-semibold"
              onClick={() => {
                setOpenSheet(false);
                nav('/chat');
              }}
            >
              채팅방 나가기
            </button>
          </div>
        </div>
      )}
    </PageWithHeader>
  );
}
