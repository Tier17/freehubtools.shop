'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/50 dark:bg-white/10 backdrop-blur-xl border border-white/20 dark:border-white/10 border-b border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-300">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white font-bold text-sm shadow-lg">
              FH
            </div>
            <span className="hidden font-semibold sm:inline-block text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              FreeHubTools
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#categories" className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300 font-medium">
              Categories
            </Link>
            <Link href="/#tools" className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300 font-medium">
              Tools
            </Link>
            <Link href="/#about" className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300 font-medium">
              About
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full">
              <Link href="#contact">
                Contact
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
