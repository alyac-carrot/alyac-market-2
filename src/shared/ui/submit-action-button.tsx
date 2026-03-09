import { Button } from './button';

type SubmitActionButtonProps = {
  canSubmit: boolean;
  isSubmitting: boolean;
  onClick: () => void;
  idleText: string;
  loadingText: string;
  className?: string;
};

export function SubmitActionButton({
  canSubmit,
  isSubmitting,
  onClick,
  idleText,
  loadingText,
  className,
}: SubmitActionButtonProps) {
  return (
    <Button
      type="button"
      disabled={!canSubmit || isSubmitting}
      onClick={onClick}
      className={[
        'rounded-full px-8 font-medium transition-colors',
        canSubmit && !isSubmitting
          ? 'bg-green-500 text-white hover:bg-green-600'
          : 'bg-green-500 text-white',
        className,
      ].join(' ')}
    >
      {isSubmitting ? loadingText : idleText}
    </Button>
  );
}
