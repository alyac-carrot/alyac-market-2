import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared/ui/button';

import { HeaderShell } from './HeaderShell';

export function FeedHeader() {
  return (
    <HeaderShell
      left={
        <Link to="/feed" className="text-lg font-bold">
          알약마켓 피드
        </Link>
      }
      right={
        <Button asChild variant="ghost" size="icon" aria-label="검색" className="h-12 w-12">
          <Link to="/search">
            <Search className="h-6 w-6" />
          </Link>
        </Button>
      }
    />
  );
}
