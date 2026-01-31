import { MetadataRoute } from 'next';
import { toolData } from '@/lib/tools-data';
import { blogPosts } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.freehubtools.shop';

  // Static routes
  const routes = [
    '',
    '/contact',
    '/privacy',
    '/terms',
    '/blog',
    '/category/text-ai',
    '/category/image-ai',
    '/category/audio-ai',
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

  // Blog routes
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...toolRoutes, ...blogRoutes];
}
