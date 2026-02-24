import { createContext } from 'react';

export type SearchCtx = {
  value: string;
  setValue: (v: string) => void;
};

export const SearchContext = createContext<SearchCtx | null>(null);
