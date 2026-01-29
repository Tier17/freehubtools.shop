'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HomeHero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32 lg:py-40 border-b border-border/40 bg-gradient-to-br from-background via-background to-accent/10">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center slide-up">
          <div className="mb-6 inline-flex gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30 text-xs font-medium">
            <span>✨</span>
            <span>Free & Powerful Tools</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent mb-6 text-balance">
            Free Hub of Online Tools
          </h1>
          
          <p className="text-lg sm:text-xl text-foreground/70 mb-8 max-w-2xl text-balance font-medium">
            AI-powered and utility tools you can use daily. No signup required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full shadow-lg shadow-black/10 dark:shadow-black/30 hover:shadow-xl hover:shadow-black/15 dark:hover:shadow-black/40 hover:scale-105">
              <Link href="#tools">
                Browse Tools
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="rounded-full border-2 border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 bg-transparent">
              <Link href="#categories">
                Explore Categories
              </Link>
            </Button>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-foreground/60">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚡</span>
              <span>Fast & Reliable</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🔒</span>
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🎯</span>
              <span>No Signup</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
