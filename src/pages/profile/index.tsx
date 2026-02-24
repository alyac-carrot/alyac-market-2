import { useParams } from 'react-router-dom';

export function ProfilePage() {
  const { userId } = useParams();

  return (
    <div className="px-4 pt-3">
      <div className="flex items-center gap-3">
        <div className="h-16 w-16 rounded-full bg-zinc-200" />
        <div className="min-w-0">
          <p className="truncate text-base font-semibold">프로필 {userId}</p>
          <p className="truncate text-sm text-zinc-500">@handle</p>
        </div>
      </div>
    </div>
  );
}
