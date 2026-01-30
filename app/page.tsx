import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HomeHero } from '@/components/home-hero';
import { TopPicks } from '@/components/top-picks';
import { SiteFeatures } from '@/components/site-features';
import { CategoryGrid } from '@/components/category-grid';
import { HowItWorks } from '@/components/how-it-works';

export default function Home() {
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FreeHubTools',
    url: 'https://freehubtools.shop',
    description: 'Free AI-powered and utility tools for productivity, image editing, and content creation.',
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FreeHubTools',
    url: 'https://freehubtools.shop',
    logo: 'https://freehubtools.shop/icon.svg',
  };

  return (
    <main className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Header />
      <div className="flex-1">
        <HomeHero />
        <TopPicks />
        <SiteFeatures />
        <CategoryGrid />
        <HowItWorks />
      </div>
      <Footer />
    </main>
  );
}
