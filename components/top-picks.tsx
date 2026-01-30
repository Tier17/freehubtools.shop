import { ConnoisseurStackInteractor, MenuItem } from "@/components/ui/connoisseur-stack-interactor";

const trendingTools: MenuItem[] = [
  {
    num: "01",
    name: "PDF Editor",
    clipId: "clip-layout",
    // Unsplash: Work/Document/Paper
    image: "https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    href: "/tool/pdf-editor"
  },
  {
    num: "02",
    name: "Background Remover",
    clipId: "clip-pixels",
    // Unsplash: Editing/Creative
    image: "https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    href: "/tool/background-remover"
  },
  {
    num: "03",
    name: "Article Summarizer",
    clipId: "clip-lines",
    // Unsplash: Reading/Book - Updated image
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    href: "/tool/article-summarizer"
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
