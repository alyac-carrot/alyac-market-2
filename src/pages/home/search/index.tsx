import { useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ArrowLeftIcon } from '@/shared/ui/icons';

type UserItem = {
  id: string;
  name: string;
  handle: string;
  tag: string; // 예: "알약"
};

const MOCK_USERS: UserItem[] = [
  { id: '1', name: '이스트 시큐리티', handle: '@estSecurity_alyac', tag: '알약' },
  { id: '2', name: '알약 클라우드 이스트 시큐리티', handle: '@alyac_cloud', tag: '알약' },
  { id: '3', name: '보안 닥터스 알약', handle: '@security_alyac', tag: '알약' },
];

export function SearchPage() {
  const nav = useNavigate();
  const [q, setQ] = useState('');

  const results = useMemo(() => {
    const keyword = q.trim().toLowerCase();
    if (!keyword) return [];
    return MOCK_USERS.filter((u) => {
      return (
        u.name.toLowerCase().includes(keyword) ||
        u.handle.toLowerCase().includes(keyword) ||
        u.tag.toLowerCase().includes(keyword)
      );
    });
  }, [q]);

  return (
    <div className="px-4 pt-3">
      {/* 상단 검색 바 */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => nav(-1)}
          className="grid h-10 w-10 place-items-center rounded-full text-zinc-700 active:scale-95"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>

        <div className="flex-1">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="계정 검색"
            className="h-11 w-full rounded-full bg-zinc-100 px-5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 결과 영역 */}
      <div className="mt-4">
        {!q.trim() ? (
          <p className="text-sm text-zinc-400">검색어를 입력해보세요.</p>
        ) : results.length === 0 ? (
          <p className="text-sm text-zinc-400">검색 결과가 없어요.</p>
        ) : (
          <ul className="space-y-3">
            {results.map((u) => (
              <li
                key={u.id}
                className="flex items-center gap-3"
                // onClick={() => nav(`/profile/${u.id}`)}  // 나중에 프로필로 연결 가능
              >
                {/* 프로필 이미지 자리(회색 원) */}
                <div className="h-10 w-10 rounded-full bg-zinc-200" />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-zinc-900">{u.name}</p>
                    <span className="rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-600">
                      {u.tag}
                    </span>
                  </div>
                  <p className="truncate text-xs text-zinc-500">{u.handle}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
