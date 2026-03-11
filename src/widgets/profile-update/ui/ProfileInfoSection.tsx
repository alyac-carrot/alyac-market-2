import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { ProfileUpdateFormValues } from '@/features/profile-update';
import { FieldGroup, UnderlineInput } from '@/shared/ui';

interface ProfileInfoSectionProps {
  register: UseFormRegister<ProfileUpdateFormValues>;
  errors: FieldErrors<ProfileUpdateFormValues>;
}

export function ProfileInfoSection({ register, errors }: ProfileInfoSectionProps) {
  return (
    <div className="space-y-8 px-4 py-8">
      <FieldGroup
        label="사용자 이름"
        error={errors.username?.message}
        hint="2~10자 이내여야 합니다."
      >
        <UnderlineInput
          id="profile-username"
          type="text"
          placeholder="이름을 입력하세요"
          {...register('username')}
        />
      </FieldGroup>

      <FieldGroup
        label="계정 ID"
        error={errors.accountname?.message}
        hint="계정 ID는 변경할 수 없습니다."
      >
        <UnderlineInput
          id="profile-accountname"
          type="text"
          disabled
          className="opacity-60"
          placeholder="계정 아이디를 입력하세요"
          {...register('accountname')}
        />
      </FieldGroup>

      <FieldGroup
        label="소개"
        error={errors.intro?.message}
        hint="최대 60자 이내로 소개를 작성해 주세요."
      >
        <UnderlineInput
          id="profile-intro"
          type="text"
          placeholder="간단한 자기소개를 입력하세요"
          {...register('intro')}
        />
      </FieldGroup>
    </div>
  );
}
