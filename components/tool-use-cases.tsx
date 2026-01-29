'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface UseCase {
  title: string;
  description: string;
}

interface ToolUseCasesProps {
  useCases: UseCase[];
}

export function ToolUseCases({ useCases }: ToolUseCasesProps) {
  return (
    <section className="border-b border-border/40 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter text-foreground mb-2">
            Use Cases
          </h2>
          <p className="text-foreground/70">
            See how others are using this tool
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {useCases.map((useCase, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="text-lg">{useCase.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {useCase.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
