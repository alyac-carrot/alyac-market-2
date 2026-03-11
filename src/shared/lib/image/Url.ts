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

export function splitImagePaths(paths?: string) {
  const trimmed = paths?.trim();
  if (!trimmed) return [];

  return trimmed
    .split(',')
    .map((path) => path.trim())
    .filter(Boolean);
}

export function normalizeUploadPath(filename: string) {
  const trimmed = filename?.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('uploadFiles/')) return trimmed;
  if (trimmed.startsWith('/uploadFiles/')) return trimmed.replace(/^\/+/, '');
  return `uploadFiles/${trimmed.replace(/^\/+/, '')}`;
}
