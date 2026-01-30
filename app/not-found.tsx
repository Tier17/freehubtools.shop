import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion, Home, Search, Wrench } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="bg-muted/30 p-6 rounded-full mb-6">
        <FileQuestion className="w-16 h-16 text-muted-foreground" />
      </div>
      
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
        Page Not Found
      </h1>
      
      <p className="text-lg text-muted-foreground max-w-lg mb-8">
        Sorry, we couldn't find the page you're looking for. It might have been moved, 
        deleted, or never existed.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg">
          <Link href="/">
            <Home className="mr-2 w-4 h-4" />
            Go Home
          </Link>
        </Button>
        
        <Button asChild variant="outline" size="lg">
          <Link href="/tools">
            <Wrench className="mr-2 w-4 h-4" />
            Browse Tools
          </Link>
        </Button>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-2xl w-full">
        <Link href="/category/text-ai" className="group p-4 rounded-lg border hover:border-primary transition-colors">
          <h3 className="font-semibold group-hover:text-primary mb-1">Text AI Tools</h3>
          <p className="text-sm text-muted-foreground">Summarizers, rewriters, and more.</p>
        </Link>
        
        <Link href="/category/image-ai" className="group p-4 rounded-lg border hover:border-primary transition-colors">
          <h3 className="font-semibold group-hover:text-primary mb-1">Image AI Tools</h3>
          <p className="text-sm text-muted-foreground">Remove backgrounds, upscale, and resize.</p>
        </Link>
        
        <Link href="/category/productivity" className="group p-4 rounded-lg border hover:border-primary transition-colors">
          <h3 className="font-semibold group-hover:text-primary mb-1">Productivity</h3>
          <p className="text-sm text-muted-foreground">PDF tools, converters, and utilities.</p>
        </Link>
      </div>
    </div>
  );
}
