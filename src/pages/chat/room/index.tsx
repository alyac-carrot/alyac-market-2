import { useEffect, useMemo, useRef, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

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

export default function ChatRoomPage() {
  const nav = useNavigate();
  const { roomId = '1' } = useParams();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const title = ROOM_TITLE[roomId] ?? '채팅방';

  const [openSheet, setOpenSheet] = useState(false);
  const [input, setInput] = useState('');

  // 예시 프로필 이미지
  const meAvatarUrl = '/mascot.png';
  const themAvatarUrl = '/mascot.png';
  // 예: '/assets/them.png'

  const [messages, setMessages] = useState<Msg[]>([
    { id: 'a', from: 'them', text: '테스트용 말', time: '12:39' },
    { id: 'b', from: 'them', text: '테스트 확인입니다', time: '12:44' },
    { id: 'c', from: 'me', text: '알겠습니다.', time: '12:50' },
    { id: 'e', from: 'them', text: '사진은 나중에', time: '12:55' },
    // { id: 'img1', from: 'me', imageUrl: 'https://picsum.photos/300/200', time: '12:56' },
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

  // 메시지 추가되면 자동 스크롤
  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  const grouped = useMemo(() => messages, [messages]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* 메시지 리스트 */}
      <div ref={listRef} className="flex-1 space-y-3 overflow-auto bg-zinc-50 px-4 py-4">
        {grouped.map((m) => (
          <div
            key={m.id}
            className={`flex items-end gap-2 ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            {/*  상대 프로필(왼쪽) */}
            {m.from === 'them' && (
              <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-zinc-200">
                {themAvatarUrl ? (
                  <img src={themAvatarUrl} alt="them" className="h-full w-full object-cover" />
                ) : null}
              </div>
            )}

            {/* 메시지 박스 */}
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
                  className={`overflow-hidden rounded-2xl ${
                    m.from === 'me' ? '' : 'border bg-white'
                  }`}
                >
                  <img src={m.imageUrl} alt="첨부" className="h-auto w-64" />
                </div>
              )}

              <p
                className={`mt-1 text-[10px] text-zinc-400 ${
                  m.from === 'me' ? 'text-right' : 'text-left'
                }`}
              >
                {m.time}
              </p>
            </div>

            {/* ✅ 내 프로필(오른쪽) */}
            {m.from === 'me' && (
              <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-zinc-200">
                {meAvatarUrl ? (
                  <img src={meAvatarUrl} alt="me" className="h-full w-full object-cover" />
                ) : null}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 입력창 */}
      <div className="border-t bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          {/* ✅ 입력창 왼쪽 내 프로필 */}
          <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-zinc-200">
            {meAvatarUrl ? (
              <img src={meAvatarUrl} alt="me" className="h-full w-full object-cover" />
            ) : null}
          </div>

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
            className={`text-sm font-semibold transition-transform duration-150 ${
              canSend
                ? 'cursor-pointer text-green-600 active:scale-90'
                : 'cursor-not-allowed text-zinc-300'
            } `}
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
