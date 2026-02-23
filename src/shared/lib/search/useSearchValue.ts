import { useContext } from 'react';

import { SearchContext, type SearchCtx } from './searchContext';

export function useSearchValue(): SearchCtx {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearchValue는 SearchProvider로 감싼 영역 안에서만 사용가능.');
  return ctx;
}
