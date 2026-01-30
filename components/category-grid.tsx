import FlowingMenu from './ui/flowing-menu';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const tools = [
  {
    link: '/tool/pdf-editor',
    text: 'PDF Editor',
    image: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    link: '/tool/article-summarizer',
    text: 'Article Summarizer',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    link: '/tool/paraphraser',
    text: 'Paraphraser',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    link: '/tool/grammar-checker',
    text: 'Grammar Checker',
    image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    link: '/tool/background-remover',
    text: 'Background Remover',
    image: 'https://images.unsplash.com/photo-1633536726481-465c3676851d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    link: '/tool/image-upscaler',
    text: 'Image Upscaler',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    link: '/tool/text-to-speech',
    text: 'Text to Speech',
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    link: '/tool/resume-improver',
    text: 'Resume Improver',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    link: '/tool/seo-generator',
    text: 'SEO Generator',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    link: '/tool/email-rewriter',
    text: 'Email Rewriter',
    image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  }
];

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
