import { ArrowLeft, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HeaderShell } from './HeaderShell';

export function AppHeader() {
  const navigate = useNavigate();

  return (
    <HeaderShell
      left={
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center"
          aria-label="뒤로가기"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
      }

      center={null}
      
      right={
        <button
          type="button"
          onClick={() => {
            console.log('menu');
          }}
          className="flex h-10 w-10 items-center justify-center"
          aria-label="메뉴"
        >
          <MoreVertical className="h-6 w-6" />
        </button>
      }
    />
  );
}