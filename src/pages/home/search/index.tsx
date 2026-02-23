// src/pages/home/search/index.tsx
import { useMemo } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

type UserItem = {
  id: string;
  name: string;
  handle: string;
  tag: string;
};

const MOCK_USERS: UserItem[] = [
  { id: '1', name: '이스트 시큐리티', handle: '@es', tag: '알약' },
  { id: '2', name: '알약 클라우드 이스트 시큐리티', handle: '@alyac_cloud', tag: '알약' },
  { id: '3', name: '보안 닥터스 알약', handle: '@security_alyac', tag: '알약' },
];

export function SearchPage() {
  const nav = useNavigate();
  const [sp] = useSearchParams();

  // ✅ 헤더 입력값이 여기로 들어오게 됨
  const q = (sp.get('q') ?? '').trim();

  const results = useMemo(() => {
    const keyword = q.toLowerCase();
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
    <div className="px-4 pt-16">
      {/* ✅ 여기서 회색 검색창 렌더링하던 부분 제거 */}
      {results.length === 0 ? (
        <div className="text-muted-foreground mt-10 text-center">검색어를 입력해보세요.</div>
      ) : (
        <ul className="mt-4 space-y-3">
          {results.map((u) => (
            <li
              key={u.id}
              className="rounded-xl border p-4"
              onClick={() => nav(`/profile/${u.id}`)}
            >
              <div className="font-semibold">{u.name}</div>
              <div className="text-muted-foreground text-sm">{u.handle}</div>
              <div className="mt-1 text-xs">{u.tag}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
