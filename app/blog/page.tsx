import type { Metadata } from 'next';
import { blogPosts } from '@/lib/blog-data';
import { BlogList } from '@/components/blog-list';

export const metadata: Metadata = {
  title: 'Blog - FreeHubTools',
  description: 'Tips, tutorials, and updates about AI tools and productivity.',
  alternates: {
    canonical: 'https://www.freehubtools.shop/blog',
  },
};

export default function BlogPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Our Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover tutorials, guides, and the latest updates on our free AI tools.
        </p>
      </div>

      <BlogList posts={blogPosts} />
    </div>
  );
}
