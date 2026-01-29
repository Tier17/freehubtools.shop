import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HomeHero } from '@/components/home-hero';
import { SiteFeatures } from '@/components/site-features';
import { CategoryGrid } from '@/components/category-grid';
import { HowItWorks } from '@/components/how-it-works';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">
        <HomeHero />
        <SiteFeatures />
        <CategoryGrid />
        <HowItWorks />
      </div>
      <Footer />
    </main>
  );
}
