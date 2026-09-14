const PROVIDER = 'mshots';

export function getScreenshot(url: string, w = 1400, h = 900): string {
  if (PROVIDER === 'mshots')
    return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=${w}&h=${h}`;
  return `https://image.thum.io/get/width/${w}/crop/${h}/${url}`;
}
