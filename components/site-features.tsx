import {
  Infinity,
  ShieldCheck,
  Zap,
  UserX,
  Sparkles,
  Search,
} from "lucide-react";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
  {
    Icon: ShieldCheck,
    name: "Privacy First Protection",
    description: "Your files are processed securely. We automatically delete all uploaded files from our servers after 1 hour. No data mining, ever.",
    href: "/privacy",
    cta: "Read Policy",
    background: <ShieldCheck className="absolute -right-20 -top-20 opacity-5 w-64 h-64 rotate-12 text-primary" />,
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    Icon: Zap,
    name: "Lightning Fast Processing",
    description: "Optimized algorithms ensure your files are processed in seconds, not minutes. Browser-based processing for maximum speed.",
    href: "/tools",
    cta: "Try Tools",
    background: <Zap className="absolute -right-10 -top-10 opacity-5 w-48 h-48 -rotate-12 text-primary" />,
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: Infinity,
    name: "Unlimited & Free",
    description: "No daily limits, no file size restrictions, and absolutely no hidden costs. Use our tools as much as you need.",
    href: "/tools",
    cta: "Start Now",
    background: <Infinity className="absolute -right-10 -top-10 opacity-5 w-48 h-48 rotate-6 text-primary" />,
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: UserX,
    name: "No Registration Required",
    description: "Skip the signup forms. Access all features instantly without creating an account or providing your email.",
    href: "/tools",
    cta: "Go to Tools",
    background: <UserX className="absolute -right-10 -top-10 opacity-5 w-48 h-48 -rotate-6 text-primary" />,
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: Sparkles,
    name: "Professional Quality Results",
    description: "Get high-quality outputs for PDF conversions, image compression, and text generation. Trusted by professionals.",
    href: "/tools",
    cta: "See Quality",
    background: <Sparkles className="absolute -right-20 -top-20 opacity-5 w-64 h-64 rotate-12 text-primary" />,
    className: "lg:col-span-2 lg:row-span-1",
  },
];

export function SiteFeatures() {
  return (
    <section className="py-16 sm:py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-50" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Why Use FreeHubTools?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We provide the best free online tools with a focus on privacy, speed, and quality.
          </p>
        </div>
        <BentoGrid className="lg:grid-rows-3">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
