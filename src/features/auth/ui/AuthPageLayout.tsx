export function AuthPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white px-8 dark:bg-zinc-950">
      {children}
    </div>
  );
}
