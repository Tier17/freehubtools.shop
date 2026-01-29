'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HowToStep {
  step: number;
  title: string;
  description: string;
}

interface ToolHowToProps {
  steps: HowToStep[];
}

export function ToolHowTo({ steps }: ToolHowToProps) {
  return (
    <section className="border-b border-border/40 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter text-foreground mb-2">
            How to Use
          </h2>
          <p className="text-foreground/70">
            Follow these simple steps to get started
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((item) => (
            <Card key={item.step}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="ml-14">
                <p className="text-foreground/70">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
