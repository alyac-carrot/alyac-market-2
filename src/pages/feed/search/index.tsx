import { useEffect, useMemo, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { type UserItem, searchUsers } from '@/entities/api/users';
import { useSearchValue } from '@/shared/lib/search/useSearchValue';

// 🔧 개발용 MOCK 데이터 (API 장애/테스트 대비 - 현재 미사용)
// const MOCK_USERS: UserItem[] = [
//   { id: '1', name: '이스트 시큐리티', handle: '@es', tag: '알약' },
//   { id: '2', name: '알약 클라우드 이스트 시큐리티', handle: '@alyac_cloud', tag: '알약' },
//   { id: '3', name: '보안 닥터스 알약', handle: '@security_alyac', tag: '알약' },
// ];

type FormValues = {
  keyword: string;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

// searchUsers가 어떤 형태를 반환해도(UserItem[] / AxiosResponse / {users:[]}) UserItem[]로 맞춰주는 함수
function normalizeToUserItems(out: unknown): UserItem[] {
  // 1) 이미 배열이면 그대로
  if (Array.isArray(out)) return out as UserItem[];

  // 2) { users: [...] } 형태
  if (isRecord(out) && Array.isArray(out.users)) return out.users as UserItem[];

  // 3) AxiosResponse처럼 { data: ... } 형태
  if (isRecord(out) && 'data' in out) {
    const data = out.data;

    // 3-1) data가 배열
    if (Array.isArray(data)) return data as UserItem[];

    // 3-2) data.users가 배열
    if (isRecord(data) && Array.isArray(data.users)) return data.users as UserItem[];
  }

  return [];
}

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
        const out = await searchUsers(q);
        if (!alive) return;

        const list = normalizeToUserItems(out);
        setResults(list);
      } catch {
        if (!alive) return;

        // 서버 연결 후: 목업 대신 빈 결과 처리
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
        {/*  페이지 안에도 검색 input */}
        {/* 
        <div className="mb-3">
          <input
            {...register('keyword')}
            placeholder="검색어를 입력해보세요"
            className="h-11 w-full rounded-full bg-zinc-100 px-5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
        */}

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
              <li
                key={u.id}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 active:bg-zinc-50"
                onClick={() => nav(`/profile/${u.id}`)}
              >
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
