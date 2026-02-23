import { useEffect, useRef, useState } from 'react';

import { ArrowLeft } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { HeaderShell } from './HeaderShell';

function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

export function SearchHeader() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get('q') ?? '';
  const [value, setValue] = useState(q);

  useEffect(() => setValue(q), [q]);

  const isComposingRef = useRef(false);
  const debounced = useDebouncedValue(value, 300);

  useEffect(() => {
    if (isComposingRef.current) return;

    const next = new URLSearchParams(searchParams);
    if (debounced.trim() === '') next.delete('q');
    else next.set('q', debounced);

    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <HeaderShell
      left={
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="hover:bg-muted flex h-10 w-10 items-center justify-center rounded"
          aria-label="뒤로가기"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
      }
      center={
        <input
          value={value}
          onCompositionStart={() => (isComposingRef.current = true)}
          onCompositionEnd={() => (isComposingRef.current = false)}
          onChange={(e) => setValue(e.target.value)}
          placeholder="계정 검색"
          autoFocus
          className="w-full rounded-full border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
        />
      }
    />
  );
}
