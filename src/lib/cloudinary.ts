import { getCldImageUrl } from 'astro-cloudinary/helpers';

export function getHeroBackgroundUrl(publicId: string) {
  return getCldImageUrl({
    src: publicId,
    width: 1920,
    height: 1080,
    crop: 'fill',
    gravity: 'auto',
    format: 'auto',
    quality: 'auto:best',
    dpr: 'auto',
  });
}