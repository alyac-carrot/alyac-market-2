import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { HeaderShell } from './HeaderShell';

export function DefaultHeader() {
  return (
    <HeaderShell
      left={
        <Link to="/" className=" text-lg font-bold">
          알약마켓 피드
        </Link>
      }
      right={
        <Link
          to="/search"
          className="flex h-10 w-10 items-center justify-center rounded hover:bg-muted"
          aria-label="검색"
        >
          <Search className="h-6 w-6" />
        </Link>
      }
    />
  );
}