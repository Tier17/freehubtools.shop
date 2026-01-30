import { ArrowRight, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ArticleSummarizerHero() {
  return (
    <div className="relative isolate overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-primary ring-1 ring-inset ring-primary/20 bg-primary/10">
              <span className="flex items-center gap-1">
                AI Powered
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Instant Article Summarizer
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Condense long articles, papers, or documents into clear, concise summaries.
            Choose your preferred length and format.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button size="lg" asChild>
              <Link href="#demo">
                Summarize Now <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Link href="/#tools" className="text-sm font-semibold leading-6 text-foreground">
              View all AI tools <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 dark:bg-gray-100/5 dark:ring-gray-100/10 lg:-m-4 lg:rounded-2xl lg:p-4">
               <div className="rounded-md shadow-2xl ring-1 ring-gray-900/10 dark:bg-slate-800/40 dark:ring-gray-100/10 p-4">
                <FileText className="w-[300px] h-[200px] text-muted-foreground/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
