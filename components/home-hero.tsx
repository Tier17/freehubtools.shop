'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Check, Zap, Image as ImageIcon, FileText, Wand2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function HomeHero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40 bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 opacity-50 blur-[100px]"></div>
      <div className="absolute right-0 bottom-0 -z-10 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-slate-500/10 opacity-50 blur-[100px]"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copy */}
          <div className="flex flex-col items-start text-left max-w-2xl mx-auto lg:mx-0">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-sm hover:bg-primary/10 transition-colors">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered & Free Forever</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent leading-[1.1]">
              Free Tools You’ll <br />
              <span className="text-primary">Actually Use Daily</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
              AI + utilities to save time instantly. No sign‑up required.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8">
              <Button size="lg" asChild className="h-12 px-8 text-base rounded-full shadow-lg hover:shadow-primary/25 hover:scale-105 transition-all duration-300">
                <Link href="#tools">
                  Browse Tools <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="h-12 px-8 text-base rounded-full border-2 hover:bg-muted/50 transition-all duration-300">
                <Link href="#trending">
                  Try Popular Tools
                </Link>
              </Button>
            </div>

            {/* Trust Bullets */}
            <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                  <Check className="h-3 w-3" />
                </div>
                Free
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                  <Check className="h-3 w-3" />
                </div>
                No signup
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                  <Check className="h-3 w-3" />
                </div>
                Fast
              </div>
            </div>
          </div>

          {/* Right Column: Visuals */}
          <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none perspective-1000">
            {/* Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-primary/5 to-transparent rounded-full blur-3xl -z-10 transform scale-110"></div>
            
            {/* Main Mockup Card */}
            <div className="relative bg-background/60 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden transform rotate-y-12 hover:rotate-y-0 transition-transform duration-700 ease-out">
              {/* Window Controls */}
              <div className="h-10 bg-muted/50 border-b border-border/50 flex items-center px-4 gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                <div className="ml-4 h-4 w-32 rounded-full bg-muted-foreground/10"></div>
              </div>
              
              {/* App Interface Mockup */}
              <div className="p-6 space-y-6">
                <div className="flex gap-4">
                  <div className="w-1/3 space-y-3">
                    <div className="h-20 rounded-lg bg-primary/5 border border-primary/10 flex flex-col items-center justify-center text-primary/60">
                      <ImageIcon className="h-6 w-6 mb-1" />
                      <span className="text-xs font-medium">Image</span>
                    </div>
                    <div className="h-8 rounded w-full bg-muted"></div>
                    <div className="h-8 rounded w-3/4 bg-muted/50"></div>
                  </div>
                  <div className="w-2/3 space-y-4">
                    <div className="h-32 rounded-xl bg-gradient-to-br from-muted/50 to-muted border border-border/50 flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
                        <div className="relative z-10 flex flex-col items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-background shadow-lg flex items-center justify-center text-primary animate-pulse">
                                <Wand2 className="h-5 w-5" />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground">Processing...</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                            <div className="h-full w-[70%] bg-primary rounded-full"></div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Mini Cards */}
            <div className="absolute -right-6 -top-6 bg-background/80 backdrop-blur-md border border-border/50 p-3 rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <FileText className="h-5 w-5" />
                </div>
                <div>
                    <p className="text-sm font-bold">PDF Optimized</p>
                    <p className="text-xs text-green-500 font-medium">-45% Size</p>
                </div>
            </div>

            <div className="absolute -left-6 bottom-10 bg-background/80 backdrop-blur-md border border-border/50 p-3 rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                    <Zap className="h-5 w-5" />
                </div>
                <div>
                    <p className="text-sm font-bold">Background Removed</p>
                    <p className="text-xs text-muted-foreground">0.2s Processing</p>
                </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
