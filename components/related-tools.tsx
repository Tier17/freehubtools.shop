'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RelatedTool {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface RelatedToolsProps {
  tools: RelatedTool[];
}

export function RelatedTools({ tools }: RelatedToolsProps) {
  return (
    <section className="border-b border-border/40 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter text-foreground mb-2">
            Related Tools
          </h2>
          <p className="text-foreground/70">
            You might also like these tools
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <Link key={tool.id} href={`/tool/${tool.id}`}>
              <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">{tool.name}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="w-fit text-xs">
                    {tool.category}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {tool.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
