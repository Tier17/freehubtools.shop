import { CategoryClient } from './category-client';
import { notFound } from 'next/navigation';
import CategoryBreadcrumb from './category-breadcrumb';
import CategoryHeader from './category-header';
import CategoryToolsGrid from './category-tools-grid';
import RelatedCategories from './related-categories';
import CategoryFAQ from './category-faq';

interface CategoryData {
  id: string;
  name: string;
  description: string;
  intro: string;
  tools: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
  relatedCategories: Array<{
    id: string;
    name: string;
    description: string;
  }>;
}

const categoryData: Record<string, CategoryData> = {
  'text-ai': {
    id: 'text-ai',
    name: 'Text AI Tools',
    description: 'Powerful AI tools for text processing and enhancement',
    intro: 'Our Text AI tools help you process, analyze, and enhance written content using advanced artificial intelligence.',
    tools: [
      {
        id: 'article-summarizer',
        name: 'Article Summarizer',
        description: 'Quickly summarize long articles and content into concise key points',
      },
      {
        id: 'paraphraser',
        name: 'Paraphraser',
        description: 'Rephrase text while keeping the original meaning intact',
      },
      {
        id: 'grammar-checker',
        name: 'Grammar Checker',
        description: 'Check and fix grammar, spelling, and punctuation errors',
      },
    ],
    faqs: [
      {
        id: 'faq1',
        question: 'How accurate is the Article Summarizer?',
        answer: 'Our Article Summarizer uses advanced AI models to maintain accuracy while reducing content to 30-50% of original length, preserving key information and context.',
      },
      {
        id: 'faq2',
        question: 'Does the Paraphraser preserve the original meaning?',
        answer: 'Yes! Our Paraphraser uses sophisticated NLP models to ensure the rephrased text maintains the original meaning while using different vocabulary and sentence structures.',
      },
      {
        id: 'faq3',
        question: 'What languages does the Grammar Checker support?',
        answer: 'Currently, the Grammar Checker supports English with high accuracy. Support for additional languages is coming soon.',
      },
      {
        id: 'faq4',
        question: 'Is there a limit to how much text I can process?',
        answer: 'You can process up to 5000 characters per request on free tier. Contact us for bulk processing needs.',
      },
    ],
    relatedCategories: [
      {
        id: 'image-ai',
        name: 'Image AI',
        description: 'Edit and enhance images with AI',
      },
      {
        id: 'audio-ai',
        name: 'Audio AI',
        description: 'Convert and transform audio content',
      },
      {
        id: 'productivity',
        name: 'Productivity',
        description: 'Boost your productivity with utility tools',
      },
    ],
  },
  'image-ai': {
    id: 'image-ai',
    name: 'Image AI Tools',
    description: 'Advanced AI tools for image processing and enhancement',
    intro: 'Transform your images with our cutting-edge AI tools for background removal, resizing, upscaling, and more.',
    tools: [
      {
        id: 'background-remover',
        name: 'Background Remover',
        description: 'Automatically remove backgrounds from images with one click',
      },
      {
        id: 'image-resizer',
        name: 'Image Resizer',
        description: 'Resize images to any dimensions while maintaining quality',
      },
      {
        id: 'image-upscaler',
        name: 'Image Upscaler',
        description: 'Enhance and upscale low-resolution images using AI',
      },
    ],
    faqs: [
      {
        id: 'faq1',
        question: 'What formats does Background Remover support?',
        answer: 'Our Background Remover supports JPG, PNG, WebP, and GIF formats. The output is PNG with transparency.',
      },
      {
        id: 'faq2',
        question: 'Can I upscale any size image?',
        answer: 'The Image Upscaler works best on images up to 4K resolution. For larger images, we recommend resizing first.',
      },
      {
        id: 'faq3',
        question: 'How much quality is preserved when resizing?',
        answer: 'Our intelligent resizing algorithm uses advanced interpolation to preserve maximum quality during resizing.',
      },
      {
        id: 'faq4',
        question: 'Is there a maximum file size?',
        answer: 'Maximum file size is 50MB per upload. For larger files, please compress before uploading.',
      },
    ],
    relatedCategories: [
      {
        id: 'video-ai',
        name: 'Video AI',
        description: 'Edit and process video content',
      },
      {
        id: 'audio-ai',
        name: 'Audio AI',
        description: 'Convert and transform audio content',
      },
      {
        id: 'text-ai',
        name: 'Text AI',
        description: 'Process and enhance text content',
      },
    ],
  },
  'audio-ai': {
    id: 'audio-ai',
    name: 'Audio AI Tools',
    description: 'AI-powered tools for audio processing and conversion',
    intro: 'Create and convert audio content with our AI-powered audio tools for text-to-speech, format conversion, and more.',
    tools: [
      {
        id: 'text-to-speech',
        name: 'Text to Speech',
        description: 'Convert written text into natural-sounding audio',
      },
      {
        id: 'audio-converter',
        name: 'Audio Converter',
        description: 'Convert audio between different formats seamlessly',
      },
    ],
    faqs: [
      {
        id: 'faq1',
        question: 'What voices are available in Text to Speech?',
        answer: 'We offer 50+ natural-sounding voices in multiple languages including English, Spanish, French, German, and more.',
      },
      {
        id: 'faq2',
        question: 'What audio formats are supported?',
        answer: 'Audio Converter supports MP3, WAV, FLAC, OGG, M4A, AAC, and more. All conversions maintain quality.',
      },
      {
        id: 'faq3',
        question: 'Can I adjust the speech speed?',
        answer: 'Yes! You can adjust speech speed from 0.5x to 2x normal speed for optimal listening experience.',
      },
      {
        id: 'faq4',
        question: 'How long can audio be?',
        answer: 'Text to Speech supports up to 5000 characters. For Audio Converter, file size limit is 100MB.',
      },
    ],
    relatedCategories: [
      {
        id: 'video-ai',
        name: 'Video AI',
        description: 'Edit and process video content',
      },
      {
        id: 'image-ai',
        name: 'Image AI',
        description: 'Edit and enhance images with AI',
      },
      {
        id: 'text-ai',
        name: 'Text AI',
        description: 'Process and enhance text content',
      },
    ],
  },
  'video-ai': {
    id: 'video-ai',
    name: 'Video AI Tools',
    description: 'AI tools for video processing and conversion',
    intro: 'Download videos, create GIFs, and process video content with our AI-powered video tools.',
    tools: [
      {
        id: 'youtube-downloader',
        name: 'YouTube Downloader',
        description: 'Download videos from YouTube and other platforms',
      },
      {
        id: 'video-to-gif',
        name: 'Video to GIF',
        description: 'Convert video clips into animated GIFs easily',
      },
    ],
    faqs: [
      {
        id: 'faq1',
        question: 'Is YouTube Downloader legal?',
        answer: 'Our tool respects copyright laws. Only download content you have rights to. Always respect creator licenses.',
      },
      {
        id: 'faq2',
        question: 'What quality options are available?',
        answer: 'Download in 360p, 720p, 1080p, 2K, and 4K quality depending on source availability.',
      },
      {
        id: 'faq3',
        question: 'Can I create GIFs from any video?',
        answer: 'Yes, you can upload video files or provide URLs. GIFs support videos up to 10 minutes long.',
      },
      {
        id: 'faq4',
        question: 'What is the maximum GIF file size?',
        answer: 'Output GIF files are typically 5-10MB. You can adjust duration and quality to control file size.',
      },
    ],
    relatedCategories: [
      {
        id: 'audio-ai',
        name: 'Audio AI',
        description: 'Convert and transform audio content',
      },
      {
        id: 'image-ai',
        name: 'Image AI',
        description: 'Edit and enhance images with AI',
      },
      {
        id: 'text-ai',
        name: 'Text AI',
        description: 'Process and enhance text content',
      },
    ],
  },
  'productivity': {
    id: 'productivity',
    name: 'Productivity Tools',
    description: 'Utility tools to boost your daily productivity',
    intro: 'Enhance your productivity with our collection of essential utility tools designed for daily use.',
    tools: [
      {
        id: 'password-generator',
        name: 'Password Generator',
        description: 'Create strong, secure passwords for all your accounts',
      },
      {
        id: 'qr-code-generator',
        name: 'QR Code Generator',
        description: 'Generate QR codes from text, URLs, and contact info',
      },
    ],
    faqs: [
      {
        id: 'faq1',
        question: 'How secure is the Password Generator?',
        answer: 'Our Password Generator uses cryptographically secure random generation. Nothing is stored or logged.',
      },
      {
        id: 'faq2',
        question: 'Can I customize password requirements?',
        answer: 'Yes! Choose length, include/exclude symbols, numbers, uppercase and lowercase characters.',
      },
      {
        id: 'faq3',
        question: 'What can I encode in QR codes?',
        answer: 'You can encode URLs, plain text, contact info, WiFi credentials, and more.',
      },
      {
        id: 'faq4',
        question: 'Can I download the generated QR code?',
        answer: 'Yes, QR codes can be downloaded in PNG or SVG format at various sizes and resolutions.',
      },
    ],
    relatedCategories: [
      {
        id: 'text-ai',
        name: 'Text AI',
        description: 'Process and enhance text content',
      },
      {
        id: 'image-ai',
        name: 'Image AI',
        description: 'Edit and enhance images with AI',
      },
      {
        id: 'audio-ai',
        name: 'Audio AI',
        description: 'Convert and transform audio content',
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(categoryData).map((id) => ({
    id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = categoryData[id];
  
  if (!category) {
    return {
      title: 'Category Not Found - FreeHubTools',
      description: 'The requested category could not be found.',
    };
  }

  return {
    title: `${category.name} - FreeHubTools`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = categoryData[id];

  if (!category) {
    notFound();
  }

  return <CategoryClient category={category} />;
}
