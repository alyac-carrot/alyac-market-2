import { Avatar, Button } from '@/shared/ui';

import type { Profile } from '../model/types';

interface ProfileSummaryProps {
  profile: Profile;
  isMe: boolean;
  isFollowing: boolean;
  onFollowingChange: (value: boolean) => void;
  onFollowersClick: () => void;
  onFollowingsClick: () => void;
  onEditProfile: () => void;
  onCreateProduct: () => void;
}

export default function ProfileSummary({
  profile,
  isMe,
  isFollowing,
  onFollowingChange,
  onFollowersClick,
  onFollowingsClick,
  onEditProfile,
  onCreateProduct,
}: ProfileSummaryProps) {
  return (
    <>
      <section className="mx-auto max-w-240 px-4 py-6">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-10">
            <button type="button" onClick={onFollowersClick} className="text-center">
              <div className="text-lg font-semibold">{profile.followersCount}</div>
              <div className="text-xs text-gray-500">Followers</div>
            </button>

            <Avatar src={profile.avatarUrl} alt="avatar" size="md" className="h-16 w-16" />

            <button type="button" onClick={onFollowingsClick} className="text-center">
              <div className="text-lg font-semibold">{profile.followingsCount}</div>
              <div className="text-xs text-gray-500">Followings</div>
            </button>
          </div>

          <div className="text-center">
            <div className="font-semibold">{profile.nickname}</div>
            <div className="text-sm text-gray-500">{profile.handle}</div>
            {profile.bio && <div className="mt-1 text-sm">{profile.bio}</div>}
          </div>

          <div className="mt-3 flex w-full max-w-180 gap-3">
            {isMe ? (
              <>
                <Button
                  variant="outline"
                  className="h-10 flex-1 rounded-full"
                  onClick={onEditProfile}
                >
                  프로필 수정
                </Button>
                <Button
                  variant="outline"
                  className="h-10 flex-1 rounded-full"
                  onClick={onCreateProduct}
                >
                  상품 등록
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                className="h-10 flex-1 rounded-full"
                onClick={() => onFollowingChange(!isFollowing)}
              >
                {isFollowing ? '언팔로우' : '팔로우'}
              </Button>
            )}
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gray-100" />
    </>
  );
}
