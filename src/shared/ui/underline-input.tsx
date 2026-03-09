import type { InputHTMLAttributes } from 'react';

export function UnderlineInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={
        'w-full border-0 border-b border-zinc-200 bg-transparent pb-1 text-sm text-zinc-900 placeholder-zinc-300 transition-colors outline-none focus:border-green-500 ' +
        '[&:-webkit-autofill]:shadow-[0_0_0px_1000px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#18181b]'
      }
    />
  );
}
