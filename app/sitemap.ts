import { MetadataRoute } from 'next';
import { toolData } from '@/lib/tools-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://freehubtools.shop';

  // Static routes
  const routes = [
    '',
    '/contact',
    '/privacy',
    '/terms',
    '/category/text-ai',
    '/category/image-ai',
    '/category/audio-ai',
    '/category/video-ai',
    '/category/productivity',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Tool routes
  const toolRoutes = Object.keys(toolData).map((id) => ({
    url: `${baseUrl}/tool/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...routes, ...toolRoutes];
}
