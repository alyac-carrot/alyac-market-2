import { useProfileQuery } from '@/entities/profile';
import { useMeQuery } from '@/entities/user';
import { useProfileUpdateForm } from '@/features/profile-update';
import { ProfileUpdateHeader } from '@/widgets/header';
import { ProfileImageUploadSection, ProfileInfoSection } from '@/widgets/profile-update';

type ProfileUpdateInitial = {
  _id: string;
  username: string;
  accountname: string;
  intro: string;
  image: string;
};

function ProfileUpdateContent({ profile }: { profile: ProfileUpdateInitial }) {
  const { register, errors, fileInputRef, avatarSrc, canSave, isSaving, onPickImage, onChangeFile, submit } =
    useProfileUpdateForm({ initial: profile });

  return (
    <div className="min-h-screen w-full pb-10 pt-4">
      <ProfileUpdateHeader canSave={canSave} onSave={submit} isLoading={isSaving} />

      <div className="mx-auto px-4 pt-6">
        <ProfileImageUploadSection
          avatarSrc={avatarSrc}
          onPickImage={onPickImage}
          fileInputRef={fileInputRef}
          onChangeFile={onChangeFile}
        />

        <ProfileInfoSection register={register} errors={errors} />
      </div>
    </div>
  );
}

export default function ProfileUpdatePage() {
  const meQuery = useMeQuery();
  const myAccountname = meQuery.data?.user.accountname;

  const myProfileQuery = useProfileQuery(myAccountname);

  if (meQuery.isLoading || myProfileQuery.isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (meQuery.isError || !myAccountname || myProfileQuery.isError || !myProfileQuery.data) {
    return <div className="text-muted-foreground p-6 text-center text-sm">프로필 정보를 불러오지 못했습니다.</div>;
  }

  return <ProfileUpdateContent profile={myProfileQuery.data} />;
}
