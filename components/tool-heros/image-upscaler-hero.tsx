'use client';

import { ArrowUpRight, Sparkles } from 'lucide-react';

export function ImageUpscalerHero() {
  return (
    <div className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-primary/10 blur-[100px] rounded-full opacity-30" />
        <div className="absolute left-0 bottom-0 h-[500px] w-[500px] bg-accent/10 blur-[100px] rounded-full opacity-30" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Sparkles className="mr-2 h-4 w-4" />
              AI-Powered Enhancement
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
            Upscale Images <br />
            <span className="text-primary">Without Losing Quality</span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-xl mx-auto">
            Enhance resolution, sharpen details, and boost contrast directly in your browser. 
            No server uploads, 100% private.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <div className="flex items-center gap-2 text-sm font-semibold leading-6 text-foreground">
              <ArrowUpRight className="h-5 w-5 text-primary" />
              Up to 4x Scaling
            </div>
            <div className="h-1 w-1 rounded-full bg-muted-foreground" />
            <div className="flex items-center gap-2 text-sm font-semibold leading-6 text-foreground">
              <Sparkles className="h-5 w-5 text-primary" />
              Smart Sharpening
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
