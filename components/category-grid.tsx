import FlowingMenu from './ui/flowing-menu';
import { toolData } from '@/lib/tools-data';

const tools = Object.values(toolData).map((tool) => ({
  link: `/tool/${tool.id}`,
  text: tool.name,
  image: tool.imageUrl || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
}));

export function CategoryGrid() {
  return (
    <section id="tools" className="py-16 sm:py-24 border-b border-border/40 bg-gradient-to-b from-transparent to-primary/5">
      <div className="w-full h-[600px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
          <div className="slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-foreground mb-2">
              Explore All Tools
            </h2>
            <p className="text-muted-foreground">
              Discover our complete collection of powerful AI and productivity tools.
            </p>
          </div>
        </div>
        
        <FlowingMenu 
          items={tools} 
          textColor="#2D2A26" 
          bgColor="transparent" 
          marqueeBgColor="#E85D9E" 
          marqueeTextColor="#FFFFFF"
          borderColor="#DCD0C0"
        />
      </div>
    </section>
  );
}
