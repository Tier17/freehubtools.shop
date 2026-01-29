'use client';

interface CategoryHeaderProps {
  name: string;
  description: string;
}

export function CategoryHeader({ name, description }: CategoryHeaderProps) {
  return (
    <section className="border-b border-border/40 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-foreground mb-4">
          {name}
        </h1>
        <p className="text-lg text-foreground/70 max-w-2xl">
          {description}
        </p>
      </div>
    </section>
  );
}
