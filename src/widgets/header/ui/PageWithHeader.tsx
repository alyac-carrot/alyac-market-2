import type { ReactNode } from 'react';

type PageWithHeaderProps = {
  header: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  headerOffsetClassName?: string;
};

export function PageWithHeader({
  header,
  children,
  className,
  contentClassName,
  headerOffsetClassName = 'pt-16',
}: PageWithHeaderProps) {
  return (
    <div className={className}>
      {header}
      <div className={[headerOffsetClassName, contentClassName].filter(Boolean).join(' ')}>
        {children}
      </div>
    </div>
  );
}
