import type { Msg } from '@/entities/chat';

export function ChatMessage({
  message: m,
  meAvatarUrl,
  themAvatarUrl,
}: {
  message: Msg;
  meAvatarUrl: string;
  themAvatarUrl: string;
}) {
  return (
    <div className={`flex items-end gap-2 ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
      {/* 상대 프로필(왼쪽) */}
      {m.from === 'them' && (
        <div className="bg-muted h-9 w-9 shrink-0 overflow-hidden rounded-full">
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
                : 'bg-muted text-foreground rounded-bl-md border'
            }`}
          >
            {m.text}
          </div>
        )}

        {/* 이미지 메시지 */}
        {m.imageUrl && (
          <div
            className={`overflow-hidden rounded-2xl ${m.from === 'me' ? '' : 'border bg-white dark:border-zinc-800 dark:bg-zinc-900'}`}
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

      {/* 내 프로필(오른쪽) */}
      {m.from === 'me' && (
        <div className="bg-muted h-9 w-9 shrink-0 overflow-hidden rounded-full">
          {meAvatarUrl ? (
            <img src={meAvatarUrl} alt="me" className="h-full w-full object-cover" />
          ) : null}
        </div>
      )}
    </div>
  );
}
