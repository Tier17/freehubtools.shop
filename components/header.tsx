'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useState } from 'react';

import { categoryData } from '@/lib/categories-data';

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Article Summarizer',
    href: '/tool/article-summarizer',
    description: 'Summarize long articles instantly with AI.',
  },
  {
    title: 'Background Remover',
    href: '/tool/background-remover',
    description: 'Remove image backgrounds with one click.',
  },
  {
    title: 'PDF Editor',
    href: '/tool/pdf-editor',
    description: 'Edit, sign, and annotate PDF documents.',
  },
  {
    title: 'Image Upscaler',
    href: '/tool/image-upscaler',
    description: 'Upscale images up to 4x quality without losing detail.',
  },
  {
    title: 'Grammar Checker',
    href: '/tool/grammar-checker',
    description: 'Fix grammar & style errors automatically.',
  },
];

const categories = Object.values(categoryData).map(cat => ({
  title: cat.name,
  href: `/category/${cat.id}`,
  description: cat.description
}));

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
            <div className="relative h-8 w-8 overflow-hidden rounded-lg">
              <Image 
                src="/icon.svg" 
                alt="FreeHubTools Logo" 
                fill
                className="object-cover"
              />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              FreeHubTools
            </span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {categories.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                      <li className="col-span-2 mt-2">
                         <NavigationMenuLink asChild>
                            <Link href="/#categories" className={cn(navigationMenuTriggerStyle(), "w-full justify-between bg-muted/50 hover:bg-muted")}>
                               Explore All Categories <ChevronRight className="h-4 w-4" />
                            </Link>
                         </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Popular Tools</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                      <li className="col-span-2 mt-2">
                         <NavigationMenuLink asChild>
                            <Link href="/#featured-ai-tools" className={cn(navigationMenuTriggerStyle(), "w-full justify-between bg-muted/50 hover:bg-muted")}>
                               View All Popular Tools <ChevronRight className="h-4 w-4" />
                            </Link>
                         </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/blog" className={navigationMenuTriggerStyle()}>
                      Blog
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/about" className={navigationMenuTriggerStyle()}>
                      About
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <Button asChild className="hidden md:inline-flex rounded-full px-6 shadow-sm hover:shadow-md transition-all duration-200">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <SheetHeader className="text-left mb-6">
                    <SheetTitle asChild>
                        <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                            <div className="relative h-8 w-8 overflow-hidden rounded-lg">
                                <Image 
                                src="/icon.svg" 
                                alt="FreeHubTools Logo" 
                                fill
                                className="object-cover"
                                />
                            </div>
                            <span className="font-bold text-xl">FreeHubTools</span>
                        </Link>
                    </SheetTitle>
                </SheetHeader>
                
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-medium text-muted-foreground px-2">Menu</h3>
                    <Link
                        href="/"
                        className="flex items-center justify-between rounded-md p-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                        onClick={() => setIsOpen(false)}
                      >
                        Home
                    </Link>
                     <Link
                        href="/#about"
                        className="flex items-center justify-between rounded-md p-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                        onClick={() => setIsOpen(false)}
                      >
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className="flex items-center justify-between rounded-md p-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                        onClick={() => setIsOpen(false)}
                      >
                        Contact
                    </Link>
                  </div>

                  <div className="flex flex-col gap-2">
                     <h3 className="text-sm font-medium text-muted-foreground px-2">Popular Categories</h3>
                     {categories.map((cat) => (
                         <Link
                            key={cat.title}
                            href={cat.href}
                            className="flex items-center justify-between rounded-md p-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                            onClick={() => setIsOpen(false)}
                        >
                            {cat.title}
                        </Link>
                     ))}
                  </div>

                   <div className="flex flex-col gap-2">
                     <h3 className="text-sm font-medium text-muted-foreground px-2">Featured Tools</h3>
                     {components.slice(0, 3).map((tool) => (
                         <Link
                            key={tool.title}
                            href={tool.href}
                            className="flex items-center justify-between rounded-md p-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                            onClick={() => setIsOpen(false)}
                        >
                            {tool.title}
                        </Link>
                     ))}
                  </div>

                  <div className="mt-4">
                    <Button className="w-full rounded-full" asChild onClick={() => setIsOpen(false)}>
                      <Link href="/contact">Get in Touch</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href || '/'}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
