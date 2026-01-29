'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Category {
  id: string;
  name: string;
  description: string;
}

interface RelatedCategoriesProps {
  categories: Category[];
}

export function RelatedCategories({ categories }: RelatedCategoriesProps) {
  return (
    <section className="border-b border-border/40 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter text-foreground mb-2">
            Related Categories
          </h2>
          <p className="text-foreground/70">
            Explore other tool categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.id}`}>
              <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {category.description}
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
