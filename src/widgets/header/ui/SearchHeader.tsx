import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { HeaderShell } from './HeaderShell';

export function SearchHeader() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get('q') ?? '';

  const onChange = (value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value.trim() === '') next.delete('q');
    else next.set('q', value);
    setSearchParams(next, { replace: true });
  };

  return (
    <HeaderShell
      left={
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded hover:bg-muted"
          aria-label="뒤로가기"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
      }
      center={
        <input
          value={q}
          onChange={(e) => onChange(e.target.value)}
          placeholder="계정 검색"
          autoFocus
          className="w-full rounded-full border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
        />
      }
    />
  );
}