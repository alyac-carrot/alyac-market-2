import { useEffect, useMemo, useState } from 'react';

import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { type UserItem, searchUsers } from '@/entities/user';
import { SearchUserItem } from '@/features/search';
import { useSearchValue } from '@/shared/lib/search/useSearchValue';
import { Button, Input } from '@/shared/ui';
import { PageWithFooter } from '@/widgets/footer';
import { Header, PageWithHeader } from '@/widgets/header';

type FormValues = {
  keyword: string;
};

export default function SearchPage() {
  const nav = useNavigate();
  const { value, setValue: setSearchValue } = useSearchValue();
  const initial = value ?? '';

  const { watch, setValue } = useForm<FormValues>({
    defaultValues: { keyword: initial },
    mode: 'onChange',
  });

  useEffect(() => {
    setValue('keyword', value ?? '', {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
  }, [value, setValue]);

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
        const data = await searchUsers(q);
        if (!alive) return;

        setResults(data);
      } catch {
        if (!alive) return;
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
    <PageWithFooter>
      <PageWithHeader
        className="px-4"
        header={
          <Header
            left={
              <Button type="button" variant="ghost" size="icon" onClick={() => nav(-1)} aria-label="뒤로가기">
                <ArrowLeft className="h-6 w-6" />
              </Button>
            }
            center={
              <Input
                value={value}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="계정 검색"
                autoFocus
                className="rounded-full text-sm"
              />
            }
          />
        }
        contentClassName="mt-4"
      >
        <div className="min-h-[calc(100vh-160px)]">
          {!q ? (
            <div className={centered}>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">검색어를 입력해보세요.</p>
            </div>
          ) : loading ? (
            <div className={centered}>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">검색 중...</p>
            </div>
          ) : results.length === 0 ? (
            <div className={centered}>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">검색 결과가 없어요.</p>
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
      </PageWithHeader>
    </PageWithFooter>
  );
}
