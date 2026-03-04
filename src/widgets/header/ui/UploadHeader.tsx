import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { HeaderShell } from './HeaderShell';

type UploadProps = {
  canUpload: boolean;
  onUpload?: () => void;
  isLoading?: boolean;
};

export function UploadHeader({ canUpload, onUpload, isLoading }: UploadProps) {
  const navigate = useNavigate();

  return (
    <HeaderShell
      left={
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} aria-label="뒤로가기">
          <ArrowLeft className="h-6 w-6" />
        </Button>
      }
      right={
        <Button
          type="button"
          disabled={!canUpload || isLoading}
          onClick={onUpload}
          className={[
            'rounded-full px-8 font-medium transition-colors',
            canUpload && !isLoading
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-green-500 text-white',
          ].join(' ')}
        >
          {isLoading ? '업로드 중...' : '업로드'}
        </Button>
      }
    />
  );
}