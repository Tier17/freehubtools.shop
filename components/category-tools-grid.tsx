'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
}

interface CategoryToolsGridProps {
  tools: Tool[];
}

export function CategoryToolsGrid({ tools }: CategoryToolsGridProps) {
  return (
    <section className="border-b border-border/40 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter text-foreground mb-2">
            Available Tools
          </h2>
          <p className="text-foreground/70">
            {tools.length} powerful tools in this category
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <Link key={tool.id} href={`/tool/${tool.id}`}>
              <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col justify-between h-full">
                  <CardDescription className="mb-4">
                    {tool.description}
                  </CardDescription>
                  <div className="flex items-center justify-end pt-2 border-t border-border/40">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
