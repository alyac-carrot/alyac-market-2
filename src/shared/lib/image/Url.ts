const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || import.meta.env.VITE_API_BASE_URL;

export function toImageUrl(path?: string) {
  const trimmed = path?.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  return `${IMAGE_BASE_URL}/${trimmed.replace(/^\//, '')}`;
}

export function pickFirstImage(paths?: string) {
  const trimmed = paths?.trim();
  if (!trimmed) return '';
  return trimmed.split(',')[0]?.trim() ?? '';
}
