import { ProfileUpdateHeader } from '@/widgets/header/ui/ProfileUpdateHeader';

interface ProfileUpdateActionsProps {
  canSave: boolean;
  onSave: () => void;
  isLoading: boolean;
}

export function ProfileUpdateActions({ canSave, onSave, isLoading }: ProfileUpdateActionsProps) {
  return <ProfileUpdateHeader canSave={canSave} onSave={onSave} isLoading={isLoading} />;
}
