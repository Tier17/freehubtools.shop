'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '1',
    title: 'Choose a Tool',
    description: 'Browse our categories and select the tool that fits your need. No signup required.',
    icon: '🔍',
  },
  {
    number: '2',
    title: 'Upload or Enter Data',
    description: 'Provide your input—upload images, paste text, or enter information directly.',
    icon: '📤',
  },
  {
    number: '3',
    title: 'Get Instant Results',
    description: 'Our AI processes your request in seconds and delivers professional results.',
    icon: '✨',
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 border-b border-border/40 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 slide-up">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-foreground mb-2">
            How It Works
          </h2>
          <p className="text-foreground/70 font-medium">
            Simple steps to get powerful results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-24 left-[calc(50%+4rem)] right-[calc(-4rem)] h-1">
                  <div className="w-full h-full bg-gradient-to-r from-primary to-transparent rounded-full" />
                  <ArrowRight className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2 w-5 h-5 text-primary" />
                </div>
              )}
              
              <Card className="h-full border border-white/20 dark:border-white/5 bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:shadow-primary/30 dark:hover:shadow-primary/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                      <span className="text-2xl">{step.icon}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="group-hover:text-foreground/80 transition-colors duration-300">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
