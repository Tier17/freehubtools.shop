import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HomeHero } from '@/components/home-hero';
import { CategoryGrid } from '@/components/category-grid';
import { PopularTools } from '@/components/popular-tools';
import { WhySection } from '@/components/why-section';
import { HowItWorks } from '@/components/how-it-works';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">
        <HomeHero />
        <CategoryGrid />
        <PopularTools />
        <WhySection />
        <HowItWorks />
      </div>
      <Footer />
    </main>
  );
}
