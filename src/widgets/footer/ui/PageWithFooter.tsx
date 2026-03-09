import type { ReactNode } from 'react';

import { Footer } from './Footer';

type PageWithFooterProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function PageWithFooter({ children, className, contentClassName }: PageWithFooterProps) {
  return (
    <div className={className}>
      <div className={['pb-16', contentClassName].filter(Boolean).join(' ')}>{children}</div>
      <Footer />
    </div>
  );
}
