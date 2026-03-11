import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[calc(100vh-56px-72px)] items-center justify-center bg-white dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-8 text-center">
        {/* Logo */}
        <div className="w-24">
          <img src="/full-logo-alyac-404.png" alt="404" className="h-auto w-full" />
        </div>

        {/* Message */}
        <p className="text-sm text-[#767676] dark:text-zinc-400">페이지를 찾을 수 없습니다. :(</p>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="rounded-full bg-[#11cc27] px-12 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-[#11cc27] dark:text-white"
        >
          이전 페이지
        </button>
      </div>
    </div>
  );
}
