const RAW = import.meta.env.VITE_BASE_URL;
const IMAGE_BASE_URL = RAW.replace(/\/+$/, '');

export function toImageUrl(path?: string) {
  const trimmed = path?.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//.test(trimmed)) return trimmed;
  const normalized = trimmed.replace(/^\/+/, '');
  return `${IMAGE_BASE_URL}/${normalized}`;
}

export function pickFirstImage(paths?: string) {
  const trimmed = paths?.trim();
  if (!trimmed) return '';
  return trimmed.split(',')[0]?.trim() ?? '';
}
