import type { ReactNode } from 'react';

import { ThemeProvider } from '@/shared/lib/theme';

export function AppProviders({ children }: { children: ReactNode }) {
  return <ThemeProvider defaultTheme="system">{children}</ThemeProvider>;
}
