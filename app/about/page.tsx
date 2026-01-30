import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Shield, Zap, Heart, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - FreeHubTools',
  description: 'Learn more about FreeHubTools and our mission to provide free, high-quality AI tools for everyone.',
  alternates: {
    canonical: 'https://freehubtools.shop/about',
  },
};

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Tools for Everyone, <br/>
              <span className="text-primary">Free Forever.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We believe that powerful tools shouldn't be locked behind paywalls. 
              FreeHubTools provides professional-grade AI and utility tools completely free of charge, 
              with no sign-up required.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button asChild size="lg">
                <Link href="/tools">Explore Tools</Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div className="mt-4 flex flex-auto flex-col text-base leading-7">
                <h3 className="font-semibold text-foreground">Privacy First</h3>
                <p className="mt-2 flex-auto text-muted-foreground">
                  Your data belongs to you. Many of our tools process files directly in your browser, 
                  ensuring your sensitive documents never leave your device.
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div className="mt-4 flex flex-auto flex-col text-base leading-7">
                <h3 className="font-semibold text-foreground">Lightning Fast</h3>
                <p className="mt-2 flex-auto text-muted-foreground">
                  No waiting in queues. Our optimized algorithms and client-side processing 
                  deliver results in seconds, not minutes.
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div className="mt-4 flex flex-auto flex-col text-base leading-7">
                <h3 className="font-semibold text-foreground">100% Free</h3>
                <p className="mt-2 flex-auto text-muted-foreground">
                  No hidden costs, no premium tiers, no credit card required. 
                  Just useful tools when you need them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Story</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            FreeHubTools started with a simple idea: the internet is better when tools are accessible. 
            We were tired of finding a "free" tool only to hit a paywall after one use. 
            So we built a collection of high-quality utilities that are genuinely free.
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            From PDF editing to AI image generation, we are constantly adding new tools to help you 
            be more productive.
          </p>
        </div>
      </div>
    </div>
  );
}
