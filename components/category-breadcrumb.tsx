'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface CategoryBreadcrumbProps {
  categoryName: string;
  categoryId: string;
}

export function CategoryBreadcrumb({ categoryName, categoryId }: CategoryBreadcrumbProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-foreground/70">
      <Link href="/" className="hover:text-foreground transition-colors">
        Home
      </Link>
      <ChevronRight className="w-4 h-4" />
      <span className="text-foreground">{categoryName}</span>
    </div>
  );
}
