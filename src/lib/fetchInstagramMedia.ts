export interface InstagramMediaResult {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  username: string;
  caption: string;
}

function isDataUri(url: string | undefined): boolean {
  return !url || url.startsWith('data:');
}

/**
 * Resolves a public Instagram post/reel/TV URL to real media URLs via Microlink
 * (metadata + CDN links). Private or removed posts will fail.
 */
export async function fetchInstagramMedia(instagramUrl: string): Promise<InstagramMediaResult> {
  const trimmed = instagramUrl.trim();
  const apiUrl = new URL('https://api.microlink.io/');
  apiUrl.searchParams.set('url', trimmed);
  apiUrl.searchParams.set('video', 'true');

  const key = import.meta.env.VITE_MICROLINK_API_KEY as string | undefined;
  if (key) {
    apiUrl.searchParams.set('apiKey', key);
  }

  const res = await fetch(apiUrl.toString());
  const json = (await res.json()) as {
    status: string;
    message?: string;
    data?: {
      author?: string;
      title?: string;
      description?: string;
      url?: string;
      image?: { url?: string };
      video?: { url?: string };
    };
  };

  if (json.status !== 'success' || !json.data) {
    throw new Error(
      json.message || 'Could not load this Instagram link. Try a public post or reel URL.'
    );
  }

  const { data } = json;

  let username = data.author?.replace(/^@/, '') || '';
  if (!username && data.url) {
    const m = data.url.match(/instagram\.com\/([^/]+)\/(?:p|reel|tv)\//i);
    if (m) username = m[1];
  }
  if (!username) {
    const m = trimmed.match(/instagram\.com\/([^/]+)\//i);
    if (m && !['p', 'reel', 'tv', 'stories'].includes(m[1].toLowerCase())) {
      username = m[1];
    }
  }
  if (!username) username = 'instagram';

  const caption = (data.description || data.title || '').trim();

  const videoUrl = data.video?.url;
  if (videoUrl && !isDataUri(videoUrl)) {
    return {
      type: 'video',
      url: videoUrl,
      thumbnail: !isDataUri(data.image?.url) ? data.image?.url : undefined,
      username,
      caption,
    };
  }

  const imageUrl = data.image?.url;
  if (imageUrl && !isDataUri(imageUrl)) {
    return {
      type: 'image',
      url: imageUrl,
      username,
      caption,
    };
  }

  throw new Error(
    'Could not extract media. The post may be private, deleted, or not available without logging in.'
  );
}
