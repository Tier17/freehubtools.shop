"use client";

import { ConnoisseurStackInteractor, MenuItem } from "@/components/ui/connoisseur-stack-interactor";

const topTools: MenuItem[] = [
  {
    num: "01",
    name: "PDF Editor",
    clipId: "clip-original",
    image: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    href: "/tool/pdf-editor"
  },
  {
    num: "02",
    name: "Image Compressor",
    clipId: "clip-hexagons",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    href: "/tool/image-compressor"
  },
  {
    num: "03",
    name: "Text Summarizer",
    clipId: "clip-pixels",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    href: "/tool/article-summarizer"
  }
];

export function TopToolsShowcase() {
  return (
    <section className="w-full">
       <div className="container mx-auto px-4 pt-12 pb-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-foreground">
          Top 3 Tools to Try
        </h2>
        <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore our most popular AI-powered utilities designed to boost your productivity.
        </p>
      </div>
      <ConnoisseurStackInteractor items={topTools} className="min-h-[600px] md:min-h-[700px] bg-transparent" />
    </section>
  );
}
