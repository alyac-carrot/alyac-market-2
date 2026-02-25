import { useMatch } from 'react-router-dom';

import { FooterNav } from './ui/FooterNav';

export function Footer() {
  const isUpload = useMatch('/upload/*');
  const isChatRoom = useMatch('/chat/:roomId');

  const hideFooter = Boolean(isUpload || isChatRoom);

  if (hideFooter) return null;
  return <FooterNav />;
}
