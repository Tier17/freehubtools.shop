'use client';

import { Search, Upload, Sparkles } from 'lucide-react';

const steps = [
  {
    title: 'Choose a Tool',
    description: 'Browse our categories and select the tool that fits your need. No signup required.',
    icon: Search,
  },
  {
    title: 'Upload or Enter Data',
    description: 'Provide your input—upload images, paste text, or enter information directly.',
    icon: Upload,
  },
  {
    title: 'Get Instant Results',
    description: 'Our AI processes your request in seconds delivering professional and visually appealing results.',
    icon: Sparkles,
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Simple steps to get powerful results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
