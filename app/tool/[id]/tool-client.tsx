'use client';

import { ChevronRight, ShieldCheck } from 'lucide-react';
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
import { ImageResizerHero } from '@/components/tool-heros/image-resizer-hero';
import { ImageResizerDemo } from '@/components/tool-demos/image-resizer-demo';
import { GrammarCheckerDemo } from '@/components/tool-demos/grammar-checker-demo';
import { ImageUpscalerHero } from '@/components/tool-heros/image-upscaler-hero';
import { ImageUpscalerDemo } from '@/components/tool-demos/image-upscaler-demo';
import { ImageCompressorHero } from '@/components/tool-heros/image-compressor-hero';
import { ImageCompressorDemo } from '@/components/tool-demos/image-compressor-demo';
import { ParaphraserHero } from '@/components/tool-heros/paraphraser-hero';
import { ParaphraserDemo } from '@/components/tool-demos/paraphraser-demo';
import { TextToSpeechDemo } from '@/components/tool-demos/text-to-speech-demo';
import { AudioConverterDemo } from '@/components/tool-demos/audio-converter-demo';
import { KeywordClusteringDemo } from '@/components/tool-demos/keyword-clustering-demo';
import { TextSummarizerDemo } from '@/components/tool-demos/text-summarizer-demo';
import { QrCodeGeneratorDemo } from '@/components/tool-demos/qr-code-generator-demo';
import { UnitConverterDemo } from '@/components/tool-demos/unit-converter-demo';
import { FileConverterDemo } from '@/components/tool-demos/file-converter-demo';
import { ResumeImproverDemo } from '@/components/tool-demos/resume-improver-demo';
import { PasswordGeneratorDemo } from '@/components/tool-demos/password-generator-demo';
import { TitleGeneratorDemo } from '@/components/tool-demos/title-generator-demo';
import { SeoGeneratorDemo } from '@/components/tool-demos/seo-generator-demo';
import { EmailRewriterDemo } from '@/components/tool-demos/email-rewriter-demo';
import { YoutubeDownloaderDemo } from '@/components/tool-demos/youtube-downloader-demo';
import { VideoToGifDemo } from '@/components/tool-demos/video-to-gif-demo';
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
  beta?: boolean;
  privacyNote?: string;
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
    case 'image-upscaler':
      return <ImageUpscalerHero />;
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
    case 'image-resizer':
      return <ImageResizerHero />;
    case 'image-compressor':
      return <ImageCompressorHero />;
    case 'paraphraser':
      return <ParaphraserHero />;
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
    case 'image-resizer':
      return <ImageResizerDemo />;
    case 'grammar-checker':
      return <GrammarCheckerDemo />;
    case 'image-upscaler':
      return <ImageUpscalerDemo />;
    case 'image-compressor':
      return <ImageCompressorDemo />;
    case 'paraphraser':
      return <ParaphraserDemo />;
    case 'text-to-speech':
      return <TextToSpeechDemo />;
    case 'audio-converter':
      return <AudioConverterDemo />;
    case 'resume-improver':
      return <ResumeImproverDemo />;
    case 'password-generator':
      return <PasswordGeneratorDemo />;
    case 'title-generator':
      return <TitleGeneratorDemo />;
    case 'seo-generator':
      return <SeoGeneratorDemo />;
    case 'email-rewriter':
      return <EmailRewriterDemo />;
    case 'keyword-clustering':
      return <KeywordClusteringDemo />;
    case 'text-summarizer':
      return <TextSummarizerDemo />;
    case 'qr-code-generator':
      return <QrCodeGeneratorDemo />;
    case 'unit-converter':
      return <UnitConverterDemo />;
    case 'file-converter':
      return <FileConverterDemo />;
    case 'youtube-downloader':
      return <YoutubeDownloaderDemo />;
    case 'video-to-gif':
      return <VideoToGifDemo />;
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
            <span className="text-foreground flex items-center gap-2">
              {tool.name}
              {tool.beta && (
                <span className="inline-flex items-center rounded-full border border-transparent bg-blue-600 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                  Beta
                </span>
              )}
            </span>
          </div>
        </div>
      </div>

      {customHero ? customHero : (
        <section className="border-b border-border/40 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-foreground mb-4 flex items-center gap-3">
              {tool.name}
              {tool.beta && (
                <span className="inline-flex items-center rounded-full border border-transparent bg-blue-600 px-2.5 py-0.5 text-sm font-bold uppercase tracking-wider text-white shadow-sm align-middle">
                  Beta
                </span>
              )}
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl">
              {tool.description}
            </p>
          </div>
        </section>
      )}

      <div id="demo" className="scroll-mt-24">
        {tool.privacyNote && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-8">
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-900/50 w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>{tool.privacyNote}</span>
            </div>
          </div>
        )}
        {customDemo || <ToolDemo toolName={tool.name} inputType={tool.inputType} placeholder={tool.demoPlaceholder} />}
      </div>
      
      <ToolHowTo steps={tool.howTo} />
      <ToolFeatures features={tool.features} />
      <ToolUseCases useCases={tool.useCases} />
      <RelatedTools tools={tool.relatedTools} />
      <ToolFAQ faqs={tool.faqs} toolName={tool.name} />
    </>
  );
}
