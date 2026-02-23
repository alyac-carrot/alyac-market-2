import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { HeaderShell } from './HeaderShell';
import { Button } from '@/shared/ui/button';

type PostCreateHeaderProps = {
  disabled?: boolean;
  onUpload?: () => void;
  isLoading?: boolean;
};

export function PostCreateHeader({
  disabled = false,
  onUpload,
  isLoading = false,
}: PostCreateHeaderProps) {
  const navigate = useNavigate();

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
      right={
        <Button
          size="lg"
          disabled={disabled || isLoading}
          onClick={onUpload}
          className="mr-3 rounded-full bg-green-500 hover:bg-green-600 px-8 py-3 text-base"
        >
          {isLoading ? '업로드 중...' : '업로드'}
        </Button>
      }
    />
  );
}