import { useState } from 'react';

import { FacebookIcon, GoogleIcon, KakaoIcon } from '@/shared/ui/icons';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/shared/ui/alert-dialog';
import { cn } from '@/shared/lib';

export function SocialLoginButtons() {
  const [provider, setProvider] = useState<string | null>(null);

  return (
    <>
      <button
        type="button"
        className="flex h-12 w-full items-center justify-start rounded-full border border-yellow-400 bg-white px-5 text-sm font-medium text-zinc-700 transition-colors hover:bg-yellow-100 active:scale-95 dark:border-yellow-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-yellow-900/40"
        onClick={() => setProvider('카카오톡')}
      >
        <KakaoIcon className="mr-3 h-6 w-6" />
        카카오톡 계정으로 로그인
      </button>

      <button
        type="button"
        className="flex h-12 w-full items-center justify-start rounded-full border border-zinc-300 bg-white px-5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        onClick={() => setProvider('구글')}
      >
        <GoogleIcon className="mr-3 h-6 w-6" />
        구글 계정으로 로그인
      </button>

      <button
        type="button"
        className="flex h-12 w-full items-center justify-start rounded-full border border-blue-500 bg-white px-5 text-sm font-medium text-zinc-700 transition-colors hover:bg-blue-100 active:scale-95 dark:border-blue-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-blue-900/40"
        onClick={() => setProvider('페이스북')}
      >
        <FacebookIcon className="mr-3 h-6 w-6" />
        페이스북 계정으로 로그인
      </button>

      {/* Info-only dialog — single "확인" button, no cancel needed */}
      <AlertDialog open={provider !== null} onOpenChange={(open) => { if (!open) setProvider(null); }}>
        <AlertDialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className={cn(
            'fixed top-[50%] left-[50%] z-50 grid w-96 translate-x-[-50%] translate-y-[-50%]',
            'border-border bg-popover/95 gap-0 overflow-hidden rounded-lg border p-0 shadow-lg backdrop-blur-sm',
          )}
        >
          <div className="flex flex-col gap-1.5 px-4 pt-8 pb-6 text-center">
            <AlertDialogTitle className="text-center text-lg font-medium">
              {provider} 로그인은 준비 중입니다 🙇
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-sm text-zinc-400">
              일단 이메일로 로그인 해주세요!
            </AlertDialogDescription>
          </div>

          <div className="border-border border-t">
            <AlertDialogCancel
              className={cn(
                'mt-0 h-14 w-full cursor-pointer rounded-none border-none bg-transparent text-base font-normal shadow-none',
                'text-green-500 transition-colors hover:text-green-600 focus-visible:ring-0',
              )}
            >
              확인
            </AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
