'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Sparkles } from 'lucide-react';

const tools = [
  {
    id: 'article-summarizer',
    name: 'Article Summarizer',
    description: 'Summarize long articles instantly with AI',
    category: 'Text AI',
    tags: ['AI', 'Productivity'],
    rating: 4.9,
  },
  {
    id: 'grammar-checker',
    name: 'Grammar Checker',
    description: 'Fix grammar & style errors automatically',
    category: 'Text AI',
    tags: ['AI', 'Writing'],
    rating: 4.9,
  },
  {
    id: 'background-remover',
    name: 'Background Remover',
    description: 'Remove image backgrounds with one click',
    category: 'Image AI',
    tags: ['AI', 'Design'],
    rating: 4.8,
  },
  {
    id: 'image-upscaler',
    name: 'Image Upscaler',
    description: 'Upscale images up to 4x quality',
    category: 'Image AI',
    tags: ['AI', 'Enhance'],
    rating: 4.8,
  },
];

export function PopularTools() {
  return (
    <section id="featured-ai-tools" className="py-16 sm:py-24 border-b border-border/40 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center slide-up">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3 text-primary">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-foreground mb-4">
            Featured AI Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Our most powerful AI-driven tools, curated to help you create, edit, and optimize faster than ever.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <Link key={tool.id} href={`/tool/${tool.id}`}>
              <Card className="h-full border border-border/50 bg-background/60 backdrop-blur-sm rounded-xl hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="relative z-10 pb-2">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary hover:bg-primary/10 transition-colors">
                      {tool.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-bold text-foreground/80">{tool.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors duration-300">
                    {tool.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative z-10">
                  <CardDescription className="text-sm font-medium leading-relaxed mb-4">
                    {tool.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((tag) => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground/80 bg-muted px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
