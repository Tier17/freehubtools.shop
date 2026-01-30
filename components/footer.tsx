'use client';

import Link from 'next/link';
import { Box } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-xl border border-border/20 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 mb-6 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Box className="h-6 w-6" />
            </div>
            <span className="font-semibold text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              FreeHubTools
            </span>
          </Link>
          <p className="text-sm text-foreground/70 max-w-md mb-6 leading-relaxed">
            Powerful, free AI and utility tools for everyone. Transform your productivity without breaking a sweat.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:grid-cols-5 mb-8">
          <div>
            <h3 className="font-semibold text-sm mb-4 text-foreground">Categories</h3>
            <ul className="space-y-3">
              <li><Link href="/category/text-ai" className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300 font-medium">Text AI</Link></li>
              <li><Link href="/category/image-ai" className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300 font-medium">Image AI</Link></li>
              <li><Link href="/category/audio-ai" className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300 font-medium">Audio AI</Link></li>
              <li><Link href="/category/video-ai" className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300 font-medium">Video AI</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4 text-foreground">Productivity</h3>
            <ul className="space-y-3">
              <li><Link href="/category/productivity" className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300 font-medium">All Tools</Link></li>
              <li><Link href="/" className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300 font-medium">Browse All</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4 text-foreground">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/#about" className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300 font-medium">About</Link></li>
              <li><Link href="/contact" className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300 font-medium">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4 text-foreground">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300 font-medium">Privacy</Link></li>
              <li><Link href="/terms" className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300 font-medium">Terms</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4 text-foreground">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="/website-map" className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300 font-medium">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        <Separator className="mb-8 opacity-40" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/70">
            © 2024 FreeHubTools. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-sm text-foreground/70">Made with</span>
            <span className="text-lg">💜</span>
            <span className="text-sm text-foreground/70">for creators and builders</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
