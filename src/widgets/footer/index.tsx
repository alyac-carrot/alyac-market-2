import { useLocation } from 'react-router-dom';
import { FooterNav } from './ui/FooterNav';

export function Footer() {
  const { pathname } = useLocation();

  const hideFooter =
    pathname.startsWith('/upload');

  if (hideFooter) return null;

    return <FooterNav />;
}