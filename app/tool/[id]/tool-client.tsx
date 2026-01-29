'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { ToolHowTo } from '@/components/tool-how-to';
import { ToolFeatures } from '@/components/tool-features';
import { ToolUseCases } from '@/components/tool-use-cases';
import { RelatedTools } from '@/components/related-tools';
import { ToolFAQ } from '@/components/tool-faq';
import { ArticleSummarizerHero } from '@/components/tool-heros/article-summarizer-hero';
import { BackgroundRemoverHero } from '@/components/tool-heros/background-remover-hero';
import { GrammarCheckerHero } from '@/components/tool-heros/grammar-checker-hero';
import { TextToSpeechHero } from '@/components/tool-heros/text-to-speech-hero';
import { ArticleSummarizerDemo } from '@/components/tool-demos/article-summarizer-demo';
import { BackgroundRemoverDemo } from '@/components/tool-demos/background-remover-demo';
import { PdfEditorHero } from '@/components/tool-heros/pdf-editor-hero';
import { PdfEditorDemo } from '@/components/tool-demos/pdf-editor-demo';
import { ToolDemo } from '@/components/tool-demo'; // Import ToolDemo component

interface Feature {
  title: string;
  description: string;
}

interface HowToStep {
  step: number;
  title: string;
  description: string;
}

interface UseCase {
  title: string;
  description: string;
}

interface RelatedTool {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface ToolData {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  description: string;
  inputType: 'text' | 'file' | 'textarea';
  demoPlaceholder: string;
  features: Feature[];
  howTo: HowToStep[];
  useCases: UseCase[];
  relatedTools: RelatedTool[];
  faqs: FAQ[];
}

interface ToolClientProps {
  tool: ToolData;
}

function getToolHero(toolId: string) {
  switch (toolId) {
    case 'article-summarizer':
      return <ArticleSummarizerHero />;
    case 'background-remover':
      return <BackgroundRemoverHero />;
    case 'grammar-checker':
      return <GrammarCheckerHero />;
    case 'text-to-speech':
      return <TextToSpeechHero />;
    case 'pdf-editor':
      return <PdfEditorHero />;
    default:
      return null;
  }
}

function getToolDemo(toolId: string) {
  switch (toolId) {
    case 'article-summarizer':
      return <ArticleSummarizerDemo />;
    case 'background-remover':
      return <BackgroundRemoverDemo />;
    case 'pdf-editor':
      return <PdfEditorDemo />;
    default:
      return null;
  }
}

export function ToolClient({ tool }: ToolClientProps) {
  if (!tool) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-foreground">Tool not found</h1>
      </div>
    );
  }

  const customHero = getToolHero(tool.id);
  const customDemo = getToolDemo(tool.id);

  return (
    <>
      <div className="border-b border-border/40 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-foreground/70">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/category/${tool.categoryId}`} className="hover:text-foreground transition-colors">
              {tool.category}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{tool.name}</span>
          </div>
        </div>
      </div>

      {customHero ? customHero : (
        <section className="border-b border-border/40 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-foreground mb-4">
              {tool.name}
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl">
              {tool.description}
            </p>
          </div>
        </section>
      )}

      {customDemo || <ToolDemo toolName={tool.name} inputType={tool.inputType} placeholder={tool.demoPlaceholder} />}
      
      <ToolHowTo steps={tool.howTo} />
      <ToolFeatures features={tool.features} />
      <ToolUseCases useCases={tool.useCases} />
      <RelatedTools tools={tool.relatedTools} />
      <ToolFAQ faqs={tool.faqs} toolName={tool.name} />
    </>
  );
}
