import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">

        <Link to="/" className="text-lg font-bold">
          알약마켓 피드
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/search" className="flex h-10 w-10 items-center justify-center">
            <Search className=" h-6 w-6" />
          </Link>

        </nav>
      </div>
    </header>
  );
}
