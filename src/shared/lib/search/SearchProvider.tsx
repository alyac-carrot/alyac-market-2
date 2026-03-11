import { type ReactNode, useState } from 'react';

import { SearchContext } from './searchContext';

export function SearchProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState('');

  return <SearchContext.Provider value={{ value, setValue }}>{children}</SearchContext.Provider>;
}
