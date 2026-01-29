'use client';

import { CategoryBreadcrumb } from '@/components/category-breadcrumb';
import { CategoryHeader } from '@/components/category-header';
import { CategoryToolsGrid } from '@/components/category-tools-grid';
import { RelatedCategories } from '@/components/related-categories';
import { CategoryFAQ } from '@/components/category-faq';

interface Tool {
  id: string;
  name: string;
  description: string;
}

interface RelatedCategory {
  id: string;
  name: string;
  description: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface CategoryData {
  id: string;
  name: string;
  description: string;
  intro: string;
  tools: Tool[];
  faqs: FAQ[];
  relatedCategories: RelatedCategory[];
}

interface CategoryClientProps {
  category: CategoryData;
}

export function CategoryClient({ category }: CategoryClientProps) {
  if (!category) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-foreground">Category not found</h1>
      </div>
    );
  }

  return (
    <>
      <div className="border-b border-border/40 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CategoryBreadcrumb categoryName={category.name} categoryId={category.id} />
        </div>
      </div>

      <CategoryHeader name={category.name} description={category.intro} />
      <CategoryToolsGrid tools={category.tools} />
      <RelatedCategories categories={category.relatedCategories} />
      <CategoryFAQ faqs={category.faqs} categoryName={category.name} />
    </>
  );
}
