import { cn } from '@/shared/lib/';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/shared/ui';

interface ProfileDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function ProfileDeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
}: ProfileDeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={cn(
          'fixed top-[50%] left-[50%] z-50 grid h-38 w-75',
          'translate-x-[-50%] translate-y-[-50%] gap-0 overflow-hidden',
          'border-border bg-popover/95 rounded-lg border p-0',
          'shadow-lg backdrop-blur-sm',
        )}
      >
        <div className="flex flex-col space-y-2 px-4 pt-8 pb-6 text-center sm:text-left">
          <AlertDialogTitle className="text-center text-lg font-medium">
            게시글을 삭제할까요?
          </AlertDialogTitle>

          <AlertDialogDescription className="sr-only">
            이 게시글을 삭제합니다. 삭제된 게시글은 복구할 수 없습니다.
          </AlertDialogDescription>
        </div>

        <div className="border-border flex border-t">
          <AlertDialogCancel
            className={cn(
              'hover:bg-muted hover:text-foreground mt-0 h-14 flex-1 cursor-pointer rounded-none border-none',
              'bg-transparent text-base font-normal transition-colors focus-visible:ring-0',
            )}
          >
            취소
          </AlertDialogCancel>

          <div className="bg-border w-px" />

          <AlertDialogCancel
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              'mt-0 h-14 flex-1 cursor-pointer rounded-none border-none bg-transparent text-base font-normal',
              'text-green-500 shadow-none transition-colors hover:text-green-600 focus-visible:ring-0',
              isLoading && 'cursor-not-allowed opacity-50',
            )}
          >
            {isLoading ? '삭제 중...' : '삭제'}
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
