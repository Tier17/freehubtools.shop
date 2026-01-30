import { ToolData, toolData } from '@/lib/tools-data';
import { CategoryToolsGrid } from '@/components/category-tools-grid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Tools - FreeHubTools',
  description: 'Browse our complete collection of free AI and utility tools.',
  alternates: {
    canonical: 'https://freehubtools.shop/tools',
  },
};

export default function ToolsPage() {
  const allTools = Object.values(toolData).map(tool => ({
    id: tool.id,
    name: tool.name,
    description: tool.description,
  }));

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-foreground mb-4">
            All Tools
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our complete collection of free AI-powered tools and utilities.
            No signup required, free forever.
          </p>
        </div>
        
        <CategoryToolsGrid tools={allTools} />
      </div>
    </div>
  );
}
