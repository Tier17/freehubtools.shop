import { ConnoisseurStackInteractor, MenuItem } from "@/components/ui/connoisseur-stack-interactor";
import { toolData } from '@/lib/tools-data';

const trendingTools: MenuItem[] = [
  {
    num: "01",
    name: toolData['pdf-editor'].name,
    clipId: "clip-layout",
    // Unsplash: Work/Document/Paper
    image: toolData['pdf-editor'].imageUrl || "https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    href: `/tool/${toolData['pdf-editor'].id}`
  },
  {
    num: "02",
    name: toolData['background-remover'].name,
    clipId: "clip-pixels",
    // Unsplash: Editing/Creative
    image: toolData['background-remover'].imageUrl || "https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    href: `/tool/${toolData['background-remover'].id}`
  },
  {
    num: "03",
    name: toolData['article-summarizer'].name,
    clipId: "clip-lines",
    // Unsplash: Reading/Book - Updated image
    image: toolData['article-summarizer'].imageUrl || "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    href: `/tool/${toolData['article-summarizer'].id}`
  }
];

export function TopPicks() {
  return (
    <section id="trending" className="py-16 sm:py-24 border-b border-border/40 w-full overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-foreground mb-2">
            Trending Tools
          </h2>
          <p className="text-foreground/70 font-medium text-lg">
            Our top 3 most popular tools this month
          </p>
        </div>
      </div>
      
      <div className="w-full">
        <ConnoisseurStackInteractor items={trendingTools} className="min-h-[500px]" />
      </div>
    </section>
  );
}
