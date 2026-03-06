import type { ReactNode } from 'react';

export function FieldGroup({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-zinc-500">{label}</label>
      {children}
      {error && <p className="text-xs text-green-500">{error}</p>}
      {!error && hint && <p className="text-xs text-zinc-400">{hint}</p>}
    </div>
  );
}
