import { useEffect, useMemo, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { type UserItem, searchUsers } from '@/entities/user';
import { toImageUrl } from '@/shared/lib';
import { Avatar } from '@/shared/ui';
import { useSearchValue } from '@/shared/lib/search/useSearchValue';
import { memo } from 'react';

const SearchUserItem = memo(({ user, onClick }: { user: UserItem; onClick: () => void }) => (
  <li
    className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 active:bg-zinc-50 transition-colors hover:bg-zinc-50"
    onClick={onClick}
  >
    <Avatar
      src={toImageUrl(user.image)}
      alt={user.name}
      className="h-10 w-10"
    />

    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2">
        <p className="truncate text-sm font-semibold text-zinc-900">{user.name}</p>

        <span className="rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-600">
          {user.tag}
        </span>
      </div>

      <p className="truncate text-xs text-zinc-500">{user.handle}</p>
    </div>
  </li>
));

SearchUserItem.displayName = 'SearchUserItem';

// 🔧 개발용 MOCK 데이터 (API 장애/테스트 대비 - 현재 미사용)

type FormValues = {
  keyword: string;
};

export default function SearchPage() {
  const nav = useNavigate();

  // ✅ 기존 검색어 소스(예: 상단 공용 검색바 상태)
  const { value } = useSearchValue();
  const initial = value ?? '';

  const { watch, setValue } = useForm<FormValues>({
    defaultValues: { keyword: initial },
    mode: 'onChange',
  });

  // ✅ useSearchValue 값이 바뀌면(상단 검색바에서 변경 등) 폼에도 반영
  useEffect(() => {
    setValue('keyword', value ?? '', {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
  }, [value, setValue]);

  // ✅ 입력값은 watch로 구독
  const keyword = watch('keyword') ?? '';
  const q = keyword.trim();

  const [results, setResults] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;

    const fetchUsers = async () => {
      if (!q) {
        setResults([]);
        return;
      }

      setLoading(true);

      try {
        const data = await searchUsers(q); // ✅ users.ts에서 이미 UserItem[]로 변환해서 내려줌
        if (!alive) return;

        setResults(data); // ✅ 그대로 넣기
      } catch {
        if (!alive) return;

        // setResults(MOCK_USERS); // 필요 시 주석 해제해서 사용
        setResults([]);
      } finally {
        if (alive) setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      alive = false;
    };
  }, [q]);

  const centered = useMemo(() => 'flex min-h-[calc(100vh-160px)] items-center justify-center', []);

  return (
    <div className="px-4 pt-3">
      {/* 결과 영역 */}
      <div className="mt-4 min-h-[calc(100vh-160px)]">
        {!q ? (
          <div className={centered}>
            <p className="text-sm text-zinc-400">검색어를 입력해보세요.</p>
          </div>
        ) : loading ? (
          <div className={centered}>
            <p className="text-sm text-zinc-400">검색 중...</p>
          </div>
        ) : results.length === 0 ? (
          <div className={centered}>
            <p className="text-sm text-zinc-400">검색 결과가 없어요.</p>
          </div>
        ) : (
          <ul className="space-y-1">
            {results.map((u) => (
              <SearchUserItem 
                key={u.id} 
                user={u} 
                onClick={() => nav(`/profile/${u.handle.slice(1)}`)} 
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
