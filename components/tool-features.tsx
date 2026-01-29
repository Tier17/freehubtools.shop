'use client';

import { CheckCircle } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
}

interface ToolFeaturesProps {
  features: Feature[];
}

export function ToolFeatures({ features }: ToolFeaturesProps) {
  return (
    <section className="border-b border-border/40 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter text-foreground mb-2">
            Key Features
          </h2>
          <p className="text-foreground/70">
            Discover what makes this tool powerful
          </p>
        </div>

        <div className="space-y-4">
          {features.map((feature, idx) => (
            <div key={idx} className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-foreground/70">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
