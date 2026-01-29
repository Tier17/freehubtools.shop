'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

const tools = [
  {
    id: 'article-summarizer',
    name: 'Article Summarizer',
    description: 'Quickly summarize long articles and content',
    category: 'Text AI',
    categoryId: 'text-ai',
    tags: ['AI', 'Free', 'Popular'],
    rating: 4.8,
  },
  {
    id: 'paraphraser',
    name: 'Paraphraser',
    description: 'Rephrase text while keeping the meaning intact',
    category: 'Text AI',
    categoryId: 'text-ai',
    tags: ['AI', 'Free'],
    rating: 4.7,
  },
  {
    id: 'grammar-checker',
    name: 'Grammar Checker',
    description: 'Check and fix grammar errors in your writing',
    category: 'Text AI',
    categoryId: 'text-ai',
    tags: ['AI', 'Free'],
    rating: 4.9,
  },
  {
    id: 'background-remover',
    name: 'Background Remover',
    description: 'Remove backgrounds from images automatically',
    category: 'Image AI',
    categoryId: 'image-ai',
    tags: ['AI', 'Free', 'Popular'],
    rating: 4.8,
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    description: 'Resize images to any dimensions',
    category: 'Image AI',
    categoryId: 'image-ai',
    tags: ['AI', 'Free'],
    rating: 4.6,
  },
  {
    id: 'image-upscaler',
    name: 'Image Upscaler',
    description: 'Enhance and upscale images with AI',
    category: 'Image AI',
    categoryId: 'image-ai',
    tags: ['AI', 'Free'],
    rating: 4.7,
  },
  {
    id: 'text-to-speech',
    name: 'Text to Speech',
    description: 'Convert text to natural-sounding audio',
    category: 'Audio AI',
    categoryId: 'audio-ai',
    tags: ['AI', 'Free'],
    rating: 4.5,
  },
  {
    id: 'audio-converter',
    name: 'Audio Converter',
    description: 'Convert audio between different formats',
    category: 'Audio AI',
    categoryId: 'audio-ai',
    tags: ['Utility', 'Free'],
    rating: 4.6,
  },
];

export function PopularTools() {
  return (
    <section id="tools" className="py-16 sm:py-24 border-b border-border/40 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 slide-up">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-foreground mb-2">
            Popular Tools
          </h2>
          <p className="text-foreground/70 font-medium">
            Most-used tools from our community
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool, idx) => (
            <Link key={tool.id} href={`/tool/${tool.id}`}>
              <Card className="h-full border border-white/20 dark:border-white/5 bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:shadow-primary/30 dark:hover:shadow-primary/20 transition-all duration-500 cursor-pointer hover:scale-105 hover:-translate-y-2 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardHeader className="relative z-10">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors duration-300">{tool.name}</CardTitle>
                    <div className="flex items-center gap-1 px-2 py-1 bg-accent/10 rounded-lg">
                      <Star className="w-3 h-3 fill-accent text-accent" />
                      <span className="text-xs font-semibold text-accent">{tool.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tool.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium border border-accent/20">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Badge variant="secondary" className="w-fit text-xs bg-primary/10 text-primary hover:bg-primary/20">
                    {tool.category}
                  </Badge>
                </CardHeader>

                <CardContent className="relative z-10">
                  <CardDescription className="group-hover:text-foreground/80 transition-colors duration-300">
                    {tool.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
