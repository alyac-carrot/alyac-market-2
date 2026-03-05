import { Input } from '@/shared/ui';

type FormState = {
  username: string;
  accountname: string;
  intro: string;
  image: string;
};

interface ProfileInfoSectionProps {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
}

export function ProfileInfoSection({ form, setForm }: ProfileInfoSectionProps) {
  return (
    <form className="space-y-6 px-4 py-8" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-2">
        <label htmlFor="username" className="text-foreground block text-sm font-medium">
          사용자 이름
        </label>

        <Input
          id="username"
          value={form.username}
          onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
          placeholder="이름을 입력하세요."
          className="h-12 border-t-0 border-r-0 border-b-2 border-l-0 pl-0 focus:outline-none focus-visible:ring-0"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="accountId" className="text-foreground block text-sm font-medium">
          계정 ID
        </label>

        <Input
          id="accountId"
          value={form.accountname}
          disabled
          placeholder="계정 아이디를 입력하세요."
          className="h-12 border-t-0 border-r-0 border-b-2 border-l-0 pl-0 focus:outline-none focus-visible:ring-0 disabled:opacity-60"
        />

        <p className="text-muted-foreground text-xs">계정 ID는 변경할 수 없습니다.</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="bio" className="text-foreground block text-sm font-medium">
          소개
        </label>

        <Input
          id="bio"
          value={form.intro}
          onChange={(e) => setForm((prev) => ({ ...prev, intro: e.target.value }))}
          placeholder="간단한 자기 소개를 입력하세요."
          maxLength={60}
          className="h-12 border-t-0 border-r-0 border-b-2 border-l-0 pl-0 focus:outline-none focus-visible:ring-0"
        />

        <p className="text-muted-foreground text-xs">최대 60자</p>
      </div>
    </form>
  );
}
