import { useProfileQuery } from '@/entities/profile';
import { useMeQuery } from '@/entities/user';
import { ProfileUpdateForm } from '@/features/profile-update';

export default function ProfileUpdatePage() {
  const meQuery = useMeQuery();
  const myAccountname = meQuery.data?.user.accountname;

  const myProfileQuery = useProfileQuery(myAccountname);

  if (meQuery.isLoading || myProfileQuery.isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (meQuery.isError || !myAccountname || myProfileQuery.isError || !myProfileQuery.data) {
    return (
      <div className="text-muted-foreground p-6 text-center text-sm">
        내 정보를 불러오지 못했습니다.
      </div>
    );
  }

  const profile = myProfileQuery.data;

  return <ProfileUpdateForm key={profile._id} initial={profile} />;
}
