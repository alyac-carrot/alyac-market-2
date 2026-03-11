export type Msg = {
  id: string;
  from: 'me' | 'them';
  text?: string;
  time: string;
  imageUrl?: string;
};
