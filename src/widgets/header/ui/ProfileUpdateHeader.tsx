import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui';

import { HeaderShell } from './HeaderShell';

type Props = {
  canSave: boolean;
  onSave: () => void;
  isLoading?: boolean;
};

export function ProfileUpdateHeader({ canSave, onSave, isLoading }: Props) {
  const navigate = useNavigate();

  return (
    <HeaderShell
      left={
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
      }
      right={
        <Button
          type="button"
          onClick={onSave}
          disabled={!canSave || isLoading}
          className="rounded-full bg-green-500 px-5 text-white hover:bg-green-600"
        >
          {isLoading ? '저장 중...' : '저장'}
        </Button>
      }
    />
  );
}
