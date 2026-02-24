import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useSearchValue } from '@/shared/lib/search/useSearchValue';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import { HeaderShell } from './HeaderShell';

export function SearchHeader() {
  const navigate = useNavigate();
  const { value, setValue } = useSearchValue();

  return (
    <HeaderShell
      left={
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      }
      center={
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="계정 검색"
          autoFocus
          className="rounded-full text-sm"
        />
      }
    />
  );
}
