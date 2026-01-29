import { Button } from '@/components/ui/button';
import { CheckCircle2, Wand2 } from 'lucide-react';

export function GrammarCheckerHero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32 border-b border-border/40 bg-gradient-to-b from-background via-background to-green-500/5">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 right-20 w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="slide-up text-center">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/15 text-green-600 dark:text-green-400 border border-green-500/30 text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>Perfect Your Writing</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent mb-6 text-balance">
            Write with<br />Confidence
          </h1>

          <p className="text-lg sm:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto text-balance leading-relaxed font-medium">
            Catch grammar errors, improve clarity, and enhance your writing style. Our intelligent checker provides detailed suggestions to make your content shine.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full" asChild>
              <a href="#demo">Check Now</a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-2 border-green-500/30 hover:bg-green-500/5 transition-all duration-300 bg-transparent" asChild>
              <a href="#features">View Features</a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-foreground/60 pt-8 border-t border-border/40">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Real-time check</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Wand2 className="w-4 h-4" />
              <span>Smart suggestions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>100% Accurate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
