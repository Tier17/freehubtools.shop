import Link from 'next/link';

export default function SitemapPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Sitemap</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4">Pages</h2>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            <li><Link href="/category/text-ai" className="hover:text-primary">Text AI Tools</Link></li>
            <li><Link href="/category/image-ai" className="hover:text-primary">Image AI Tools</Link></li>
            <li><Link href="/category/audio-ai" className="hover:text-primary">Audio AI Tools</Link></li>
            <li><Link href="/category/video-ai" className="hover:text-primary">Video AI Tools</Link></li>
            <li><Link href="/category/productivity" className="hover:text-primary">Productivity Tools</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
