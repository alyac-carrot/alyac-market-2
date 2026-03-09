import { cn } from '@/shared/lib';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from './alert-dialog';

type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  confirmLoadingText?: string;
  isLoading?: boolean;
  onConfirm: () => void;
};

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  cancelText = '취소',
  confirmText = '삭제',
  confirmLoadingText = '처리 중...',
  isLoading = false,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={cn(
          'fixed left-[50%] top-[50%] z-50 grid h-38 w-75 translate-x-[-50%] translate-y-[-50%]',
          'gap-0 overflow-hidden rounded-lg border border-border bg-popover/95 p-0 shadow-lg backdrop-blur-sm',
        )}
      >
        <div className="flex flex-col space-y-2 px-4 pb-6 pt-8 text-center sm:text-left">
          <AlertDialogTitle className="text-center text-lg font-medium">{title}</AlertDialogTitle>
          <AlertDialogDescription className="sr-only">
            {description ?? title}
          </AlertDialogDescription>
        </div>

        <div className="flex border-t border-border">
          <AlertDialogCancel
            className={cn(
              'mt-0 h-14 flex-1 cursor-pointer rounded-none border-none bg-transparent text-base font-normal',
              'transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-0',
            )}
          >
            {cancelText}
          </AlertDialogCancel>

          <div className="w-px bg-border" />

          <AlertDialogCancel
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              'mt-0 h-14 flex-1 cursor-pointer rounded-none border-none bg-transparent text-base font-normal shadow-none',
              'text-green-500 transition-colors hover:text-green-600 focus-visible:ring-0',
              isLoading && 'cursor-not-allowed opacity-50',
            )}
          >
            {isLoading ? confirmLoadingText : confirmText}
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
