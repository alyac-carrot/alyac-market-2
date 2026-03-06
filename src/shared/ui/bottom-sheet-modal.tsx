export function BottomSheetModal({
  isOpen,
  onClose,
  onAction,
  isLoading,
  actionLabel,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAction: () => void;
  isLoading: boolean;
  actionLabel: string;
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* backdrop */}
      <div className="fixed inset-0 z-40 bg-black/40 transition-opacity" onClick={onClose} />

      {/* sheet */}
      <div className="bg-popover border-border animate-in slide-in-from-bottom fixed right-0 bottom-0 left-0 z-50 rounded-t-2xl border-t shadow-lg duration-200">
        {/* handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="bg-muted-foreground/30 h-1 w-10 rounded-full" />
        </div>

        {/* actions */}
        <div className="px-2 pt-1 pb-6">
          <button
            type="button"
            onClick={onAction}
            disabled={isLoading}
            className="text-foreground hover:bg-accent w-full rounded-lg px-5 py-4 text-left text-base transition-colors disabled:opacity-50"
          >
            {isLoading ? '처리 중...' : actionLabel}
          </button>
        </div>
      </div>
    </>
  );
}
