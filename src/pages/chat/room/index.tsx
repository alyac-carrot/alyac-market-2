import { useMemo, useRef, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeftIcon } from '@/shared/ui/icons';

type Msg = {
  id: string;
  from: 'me' | 'them';
  text?: string;
  time: string;
  imageUrl?: string;
};

const ROOM_TITLE: Record<string, string> = {
  '1': '이스트 시큐리티',
  '2': '알약 클라우드 이스트 시큐리티',
  '3': '보안 닥터스 알약',
};

export function ChatRoomPage() {
  const nav = useNavigate();
  const { roomId = '1' } = useParams();

  const title = ROOM_TITLE[roomId] ?? '채팅방';

  const [openSheet, setOpenSheet] = useState(false);
  const [input, setInput] = useState('');

  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 'a',
      from: 'them',
      text: '테스트용 말',
      time: '12:39',
    },
    { id: 'b', from: 'them', text: '테스트 확인입니다', time: '12:44' },
    { id: 'c', from: 'me', text: '알겠습니다.', time: '12:50' },
    { id: 'e', from: 'them', text: '사진은 나중에', time: '12:55' },
  ]);

  const listRef = useRef<HTMLDivElement | null>(null);

  const canSend = input.trim().length > 0;

  const onSend = () => {
    if (!canSend) return;
    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), from: 'me', text: input.trim(), time: '지금' },
    ]);
    setInput('');
    setTimeout(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight }), 0);
  };

  const grouped = useMemo(() => messages, [messages]);

  return (
    <div className="flex min-h-[calc(100vh-56px-64px)] flex-col">
      {/* 상단바 */}
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <button
          type="button"
          onClick={() => nav(-1)}
          className="grid h-10 w-10 place-items-center rounded-full text-zinc-700 active:scale-95"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>

        <p className="text-sm font-semibold text-zinc-900">{title}</p>

        <button
          type="button"
          onClick={() => setOpenSheet(true)}
          className="ml-auto text-xl leading-none text-zinc-500"
          aria-label="더보기"
        >
          ⋮
        </button>
      </div>

      {/* 메시지 리스트 */}
      <div ref={listRef} className="flex-1 space-y-3 overflow-auto bg-zinc-50 px-4 py-4">
        {grouped.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'} gap-2`}
          >
            {m.from === 'them' && <div className="h-9 w-9 rounded-full bg-zinc-200" />}

            <div className="max-w-[70%]">
              {/* 말풍선 */}
              {m.text && (
                <div
                  className={`rounded-2xl px-3 py-2 text-sm ${
                    m.from === 'me'
                      ? 'rounded-br-md bg-green-500 text-white'
                      : 'rounded-bl-md border bg-white text-zinc-900'
                  }`}
                >
                  {m.text}
                </div>
              )}

              {/* 이미지 메시지 */}
              {m.imageUrl && (
                <div
                  className={`overflow-hidden rounded-2xl ${m.from === 'me' ? '' : 'border bg-white'}`}
                >
                  <img src={m.imageUrl} alt="첨부" className="h-auto w-[260px]" />
                </div>
              )}

              <p
                className={`mt-1 text-[10px] text-zinc-400 ${m.from === 'me' ? 'text-right' : 'text-left'}`}
              >
                {m.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 입력창 */}
      <div className="border-t bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지 입력하기..."
            className="h-11 flex-1 rounded-full bg-zinc-100 px-5 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSend();
            }}
          />
          <button
            type="button"
            onClick={onSend}
            disabled={!canSend}
            className={`text-sm font-semibold ${canSend ? 'text-green-600' : 'text-zinc-300'}`}
          >
            전송
          </button>
        </div>
      </div>

      {/* 바텀시트(나가기) */}
      {openSheet && (
        <div className="fixed inset-0 z-50">
          <button
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpenSheet(false)}
            aria-label="닫기"
          />
          <div className="absolute right-0 bottom-0 left-0 rounded-t-2xl bg-white p-4">
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-zinc-200" />
            <button
              className="w-full rounded-xl py-3 text-left text-sm font-semibold text-zinc-900"
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
    </div>
  );
}
