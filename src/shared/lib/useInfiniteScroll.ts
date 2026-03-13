import { useEffect, useRef } from 'react';

interface UseInfiniteScrollParams {
  hasNextPage?: boolean;
  isFetching?: boolean;
  onLoadMore?: () => void;
  rootMargin?: string;
}

export function useInfiniteScroll({
  hasNextPage = false,
  isFetching = false,
  onLoadMore,
  rootMargin = '200px 0px',
}: UseInfiniteScrollParams) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !hasNextPage || !onLoadMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting && !isFetching) {
          onLoadMore();
        }
      },
      { rootMargin },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [hasNextPage, isFetching, onLoadMore, rootMargin]);

  return targetRef;
}
