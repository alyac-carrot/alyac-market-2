const RAW_IMAGE = import.meta.env.VITE_IMAGE_BASE_URL || '';
const RAW_API = import.meta.env.VITE_API_BASE_URL || '';
const IMAGE_BASE_URL = RAW_IMAGE ? RAW_IMAGE.replace(/\/+$/, '') : '';
const API_BASE_URL = RAW_API ? RAW_API.replace(/\/+$/, '') : '';

export function toImageUrl(path?: string) {
  const trimmed = path?.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//.test(trimmed)) return trimmed;
  const normalized = trimmed.replace(/^\/+/, '');

  // Uploaded files are stored as `uploadFiles/...` and have historically been served by the API host.
  if (normalized.startsWith('uploadFiles/')) {
    const baseUrl = API_BASE_URL || IMAGE_BASE_URL;
    return baseUrl ? `${baseUrl}/${normalized}` : `/${normalized}`;
  }

  return IMAGE_BASE_URL ? `${IMAGE_BASE_URL}/${normalized}` : `/${normalized}`;
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
