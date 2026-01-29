'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'text-ai',
    name: 'Text AI',
    description: 'Summarize, paraphrase, and check grammar with AI',
    tools: 3,
    icon: '✍️',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'image-ai',
    name: 'Image AI',
    description: 'Remove backgrounds, resize, and upscale images',
    tools: 3,
    icon: '🖼️',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'audio-ai',
    name: 'Audio AI',
    description: 'Convert text to speech and transform audio',
    tools: 2,
    icon: '🎵',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'video-ai',
    name: 'Video AI',
    description: 'Download videos and create GIFs easily',
    tools: 2,
    icon: '🎬',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'productivity',
    name: 'Productivity',
    description: 'Generate passwords, QR codes, and more',
    tools: 2,
    icon: '⚙️',
    color: 'from-indigo-500 to-purple-500',
  },
];

export function CategoryGrid() {
  return (
    <section id="categories" className="py-16 sm:py-24 border-b border-border/40 bg-gradient-to-b from-transparent to-accent/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 slide-up">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-foreground mb-2">
            Browse by Category
          </h2>
          <p className="text-foreground/70 font-medium">
            Find the perfect tool for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((category, idx) => (
            <Link key={category.id} href={`/category/${category.id}`} className="slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <Card className="h-full border border-white/20 dark:border-white/5 bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:shadow-primary/20 dark:hover:shadow-primary/10 transition-all duration-500 cursor-pointer hover:scale-105 hover:-translate-y-2 group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`text-4xl p-3 rounded-2xl bg-gradient-to-br ${category.color} opacity-90 group-hover:opacity-100 transition-all duration-300`}>
                      {category.icon}
                    </div>
                    <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                  </div>
                  <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">{category.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col justify-between h-full">
                  <CardDescription className="line-clamp-2 mb-4 group-hover:text-foreground/80 transition-colors duration-300">
                    {category.description}
                  </CardDescription>
                  <div className="flex items-center justify-between pt-3 border-t border-border/40">
                    <span className="text-sm text-foreground/60 font-medium">
                      {category.tools} tools
                    </span>
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
