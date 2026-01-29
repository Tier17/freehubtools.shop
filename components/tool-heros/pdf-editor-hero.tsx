import { Button } from '@/components/ui/button';
import { FileText, Edit, Shield, PenTool } from 'lucide-react';

export function PdfEditorHero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32 border-b border-border/40 bg-gradient-to-b from-background via-background to-primary/5">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-20 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 text-sm font-medium">
            <Edit className="w-4 h-4" />
            <span>Edit, Sign & Annotate PDFs for Free</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent mb-4 text-balance">
            PDF Editor
          </h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground/80 mb-6">
            Your All-in-One PDF Workspace
          </h2>

          <p className="text-lg sm:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto text-balance leading-relaxed font-medium">
            Edit text, add signatures, draw shapes, and redact sensitive information. No registration required, 100% free and secure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 rounded-full" asChild>
              <a href="#demo">Start Editing</a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-2 border-primary/30 hover:bg-primary/5 transition-all duration-300 bg-transparent" asChild>
              <a href="#features">See Features</a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-foreground/60 pt-8 border-t border-border/40">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Secure & Private</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <PenTool className="w-4 h-4" />
              <span>Draw & Annotate</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>No Limits</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
