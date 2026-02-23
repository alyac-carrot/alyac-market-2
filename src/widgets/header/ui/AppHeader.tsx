import { ArrowLeft, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui/button';

import { HeaderShell } from './HeaderShell';

export function AppHeader() {
  const navigate = useNavigate();

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
      center={null}
      right={
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => {
            console.log('menu');
          }}
          aria-label="메뉴"
        >
          <MoreVertical className="h-6 w-6" />
        </Button>
      }
    />
  );
}
