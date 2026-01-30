import { ToolClient } from './tool-client';
import { notFound } from 'next/navigation';

interface ToolData {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  description: string;
  inputType: 'text' | 'file' | 'textarea';
  demoPlaceholder: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  howTo: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  useCases: Array<{
    title: string;
    description: string;
  }>;
  relatedTools: Array<{
    id: string;
    name: string;
    description: string;
    category: string;
  }>;
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
}

const toolData: Record<string, ToolData> = {
  'pdf-editor': {
    id: 'pdf-editor',
    name: 'PDF Editor',
    category: 'Productivity',
    categoryId: 'productivity',
    description: 'Edit, sign, and annotate PDF documents directly in your browser.',
    inputType: 'file',
    demoPlaceholder: 'Upload a PDF to edit...',
    features: [
      {
        title: 'Add Text',
        description: 'Add new text to your PDF documents.',
      },
      {
        title: 'Draw & Annotate',
        description: 'Freehand drawing and shape tools for annotation.',
      },
      {
        title: 'Visual Redaction',
        description: 'Cover sensitive information with black boxes (visual only).',
      },
      {
        title: 'Insert Images',
        description: 'Add images to your PDF pages.',
      },
    ],
    howTo: [
      {
        step: 1,
        title: 'Upload PDF',
        description: 'Select the PDF file you want to edit.',
      },
      {
        step: 2,
        title: 'Make Changes',
        description: 'Use the toolbar to edit, sign, or annotate.',
      },
      {
        step: 3,
        title: 'Download',
        description: 'Save your edited PDF document.',
      },
    ],
    useCases: [
      {
        title: 'Contracts',
        description: 'Sign and fill out legal documents.',
      },
      {
        title: 'Study Notes',
        description: 'Annotate lecture slides and textbooks.',
      },
      {
        title: 'Forms',
        description: 'Fill out application forms digitally.',
      },
      {
        title: 'Collaboration',
        description: 'Add comments and feedback to shared docs.',
      },
    ],
    relatedTools: [
      {
        id: 'article-summarizer',
        name: 'Article Summarizer',
        description: 'Summarize long documents',
        category: 'Text AI',
      },
    ],
    faqs: [
      {
        id: 'faq1',
        question: 'Is it secure?',
        description: 'Yes, files are processed locally in your browser when possible.',
        answer: 'Yes, files are processed locally in your browser when possible.',
      },
      {
        id: 'faq2',
        question: 'Can I edit scanned PDFs?',
        description: 'Basic annotation is supported; OCR text editing is coming soon.',
        answer: 'Basic annotation is supported; OCR text editing is coming soon.',
      },
    ],
  },
  'image-resizer': {
    id: 'image-resizer',
    name: 'Image Resizer',
    category: 'Image AI',
    categoryId: 'image-ai',
    description: 'Resize images to any dimension with pixel-perfect precision.',
    inputType: 'file',
    demoPlaceholder: 'Upload an image to resize...',
    features: [
      {
        title: 'Custom Dimensions',
        description: 'Set exact width and height or maintain aspect ratio.',
      },
      {
        title: 'Format Conversion',
        description: 'Convert between JPG, PNG, and WebP formats.',
      },
      {
        title: 'Quality Control',
        description: 'Adjust image quality to optimize file size.',
      },
      {
        title: 'Privacy Focused',
        description: 'All processing happens locally in your browser. No uploads.',
      },
    ],
    howTo: [
      {
        step: 1,
        title: 'Upload Image',
        description: 'Select the image you want to resize.',
      },
      {
        step: 2,
        title: 'Set Dimensions',
        description: 'Enter your desired width and height.',
      },
      {
        step: 3,
        title: 'Download',
        description: 'Save your resized image instantly.',
      },
    ],
    useCases: [
      {
        title: 'Social Media',
        description: 'Resize photos for Instagram, Twitter, and Facebook.',
      },
      {
        title: 'Web Optimization',
        description: 'Reduce image size for faster website loading.',
      },
      {
        title: 'Email Attachments',
        description: 'Shrink images to fit email size limits.',
      },
    ],
    relatedTools: [
      {
        id: 'background-remover',
        name: 'Background Remover',
        description: 'Remove backgrounds from images automatically',
        category: 'Image AI',
      },
      {
        id: 'image-upscaler',
        name: 'Image Upscaler',
        description: 'Enhance and upscale images with AI',
        category: 'Image AI',
      },
    ],
    faqs: [
      {
        id: 'faq-1',
        question: 'Is it free?',
        answer: 'Yes, this tool is 100% free to use.',
      },
      {
        id: 'faq-2',
        question: 'Are my images uploaded?',
        answer: 'No, all processing is done locally in your browser for maximum privacy.',
      },
    ],
  },
  'image-compressor': {
    id: 'image-compressor',
    name: 'Image Compressor',
    category: 'Image AI',
    categoryId: 'image-ai',
    description: 'Compress images to reduce file size without losing quality.',
    inputType: 'file',
    demoPlaceholder: 'Upload images to compress...',
    features: [
      {
        title: 'Lossless Compression',
        description: 'Reduce file size while maintaining visual quality.',
      },
      {
        title: 'Batch Processing',
        description: 'Compress multiple images simultaneously.',
      },
      {
        title: 'Format Support',
        description: 'Supports JPG, PNG, WebP, and more.',
      },
      {
        title: 'Comparison View',
        description: 'Compare original vs compressed images.',
      },
    ],
    howTo: [
      {
        step: 1,
        title: 'Upload Images',
        description: 'Drag and drop your images.',
      },
      {
        step: 2,
        title: 'Select Quality',
        description: 'Choose your desired compression level.',
      },
      {
        step: 3,
        title: 'Download',
        description: 'Save the compressed files.',
      },
    ],
    useCases: [
      {
        title: 'Website Speed',
        description: 'Optimize images for faster page loads.',
      },
      {
        title: 'Email Attachments',
        description: 'Shrink images to fit email size limits.',
      },
      {
        title: 'Storage Space',
        description: 'Save disk space by compressing photo libraries.',
      },
      {
        title: 'SEO',
        description: 'Improve search rankings with optimized images.',
      },
    ],
    relatedTools: [
      {
        id: 'image-resizer',
        name: 'Image Resizer',
        description: 'Resize images to any dimensions',
        category: 'Image AI',
      },
    ],
    faqs: [
      {
        id: 'faq1',
        question: 'How much space can I save?',
        description: 'Typically 50-80% reduction depending on the image.',
        answer: 'Typically 50-80% reduction depending on the image.',
      },
      {
        id: 'faq2',
        question: 'Does it affect quality?',
        description: 'Our smart compression minimizes visible quality loss.',
        answer: 'Our smart compression minimizes visible quality loss.',
      },
    ],
  },
  'article-summarizer': {
    id: 'article-summarizer',
    name: 'Article Summarizer',
    category: 'Text AI',
    categoryId: 'text-ai',
    description: 'Quickly summarize long articles and content into concise key points using advanced AI.',
    inputType: 'textarea',
    demoPlaceholder: 'Paste your article here...',
    features: [
      {
        title: 'AI-Powered Summarization',
        description: 'Uses advanced NLP to extract the most important information from your text.',
      },
      {
        title: 'Customizable Length',
        description: 'Choose how short or long your summary should be - from bullet points to paragraphs.',
      },
      {
        title: 'Preserves Context',
        description: 'Maintains the original meaning and context of the source material.',
      },
      {
        title: 'Multiple Languages',
        description: 'Works with English, Spanish, French, German, and more.',
      },
    ],
    howTo: [
      {
        step: 1,
        title: 'Paste Your Content',
        description: 'Copy and paste the article or text you want to summarize into the input box.',
      },
      {
        step: 2,
        title: 'Adjust Settings',
        description: 'Select your desired summary length and any other preferences.',
      },
      {
        step: 3,
        title: 'Get Results',
        description: 'Click summarize and get your condensed version in seconds.',
      },
    ],
    useCases: [
      {
        title: 'Research Papers',
        description: 'Quickly understand key findings from academic papers.',
      },
      {
        title: 'News Articles',
        description: 'Get the essence of news stories without reading full articles.',
      },
      {
        title: 'Long Documents',
        description: 'Extract summaries from lengthy reports and documentation.',
      },
      {
        title: 'Content Curation',
        description: 'Create summaries for sharing content on social media.',
      },
    ],
    relatedTools: [
      {
        id: 'paraphraser',
        name: 'Paraphraser',
        description: 'Rephrase text while keeping the meaning intact',
        category: 'Text AI',
      },
      {
        id: 'grammar-checker',
        name: 'Grammar Checker',
        description: 'Check and fix grammar errors in your writing',
        category: 'Text AI',
      },
    ],
    faqs: [
      {
        id: 'faq1',
        question: 'How accurate is the summarization?',
        answer: 'Our AI maintains 95%+ accuracy in capturing key information while reducing content length by 70-80%.',
      },
      {
        id: 'faq2',
        question: 'What is the maximum text length?',
        answer: 'You can summarize up to 5000 characters per request. For longer content, you can process it in sections.',
      },
      {
        id: 'faq3',
        question: 'Can I download the summary?',
        answer: 'Yes, summaries can be copied or downloaded as text files.',
      },
      {
        id: 'faq4',
        question: 'Does it work with PDFs?',
        answer: 'Currently, text input is supported. Extract text from PDFs first, then paste into the tool.',
      },
    ],
  },
  'paraphraser': {
    id: 'paraphraser',
    name: 'Paraphraser',
    category: 'Text AI',
    categoryId: 'text-ai',
    description: 'Rephrase text in different styles and tones while maintaining the original meaning.',
    inputType: 'textarea',
    demoPlaceholder: 'Enter the text you want to paraphrase...',
    features: [
      {
        title: 'Multiple Styles',
        description: 'Choose from formal, casual, academic, and creative paraphrasing styles.',
      },
      {
        title: 'Tone Selection',
        description: 'Adjust the tone to match your intended audience and purpose.',
      },
      {
        title: 'Synonym Replacement',
        description: 'Smart replacement of words with appropriate synonyms.',
      },
      {
        title: 'Plagiarism Prevention',
        description: 'Rewrite content while maintaining original meaning and avoiding plagiarism.',
      },
    ],
    howTo: [
      {
        step: 1,
        title: 'Enter Text',
        description: 'Paste the text you want to paraphrase into the input field.',
      },
      {
        step: 2,
        title: 'Select Style',
        description: 'Choose your preferred paraphrasing style from the options.',
      },
      {
        step: 3,
        title: 'Generate',
        description: 'Click generate to get your paraphrased text instantly.',
      },
    ],
    useCases: [
      {
        title: 'Academic Writing',
        description: 'Rewrite content for essays and research papers.',
      },
      {
        title: 'Content Marketing',
        description: 'Create variations of content for different platforms.',
      },
      {
        title: 'SEO Optimization',
        description: 'Generate unique content variations for multiple pages.',
      },
      {
        title: 'Translation Support',
        description: 'Improve clarity of translated content.',
      },
    ],
    relatedTools: [
      {
        id: 'article-summarizer',
        name: 'Article Summarizer',
        description: 'Quickly summarize long articles and content',
        category: 'Text AI',
      },
      {
        id: 'grammar-checker',
        name: 'Grammar Checker',
        description: 'Check and fix grammar errors in your writing',
        category: 'Text AI',
      },
    ],
    faqs: [
      {
        id: 'faq1',
        question: 'Will the meaning be preserved?',
        answer: 'Yes! Our AI paraphraser is designed to maintain the original meaning while changing the wording.',
      },
      {
        id: 'faq2',
        question: 'How many different paraphrases can I get?',
        answer: 'You can generate multiple paraphrases in different styles. Each generates a unique variation.',
      },
      {
        id: 'faq3',
        question: 'Is this tool good for avoiding plagiarism?',
        answer: 'It helps create unique versions of content, but always cite original sources appropriately.',
      },
    ],
  },
  'grammar-checker': {
    id: 'grammar-checker',
    name: 'Grammar Checker',
    category: 'Text AI',
    categoryId: 'text-ai',
    description: 'Check and correct grammar, spelling, and punctuation errors in your writing.',
    inputType: 'textarea',
    demoPlaceholder: 'Enter text to check grammar...',
    features: [
      {
        title: 'Grammar Detection',
        description: 'Identifies and explains grammar mistakes with corrections.',
      },
      {
        title: 'Spell Check',
        description: 'Catches spelling errors and suggests correct spellings.',
      },
      {
        title: 'Punctuation Help',
        description: 'Fixes punctuation mistakes and improves sentence structure.',
      },
      {
        title: 'Writing Style',
        description: 'Provides suggestions for improving clarity and readability.',
      },
    ],
    howTo: [
      {
        step: 1,
        title: 'Paste Your Text',
        description: 'Enter or paste the text you want to check.',
      },
      {
        step: 2,
        title: 'Review Errors',
        description: 'The tool highlights errors with explanations.',
      },
      {
        step: 3,
        title: 'Apply Fixes',
        description: 'Accept suggestions or edit manually.',
      },
    ],
    useCases: [
      {
        title: 'Academic Papers',
        description: 'Ensure your essays and research papers are error-free.',
      },
      {
        title: 'Business Writing',
        description: 'Polish emails, reports, and professional documents.',
      },
      {
        title: 'Content Creation',
        description: 'Check blog posts, articles, and web content.',
      },
      {
        title: 'Language Learning',
        description: 'Improve your writing skills by learning from corrections.',
      },
    ],
    relatedTools: [
      {
        id: 'article-summarizer',
        name: 'Article Summarizer',
        description: 'Quickly summarize long articles and content',
        category: 'Text AI',
      },
      {
        id: 'paraphraser',
        name: 'Paraphraser',
        description: 'Rephrase text while keeping the meaning intact',
        category: 'Text AI',
      },
    ],
    faqs: [
      {
        id: 'faq1',
        question: 'Is this better than spell check?',
        answer: 'Yes, it catches grammar issues, punctuation, and style improvements that basic spell checkers miss.',
      },
      {
        id: 'faq2',
        question: 'Does it support multiple languages?',
        answer: 'Currently optimized for English. Other languages coming soon.',
      },
      {
        id: 'faq3',
        question: 'Can I trust all the suggestions?',
        answer: 'The tool is accurate 98% of the time. Always review suggestions in context.',
      },
    ],
  },
  'image-upscaler': {
    id: 'image-upscaler',
    name: 'Image Upscaler',
    category: 'Image AI',
    categoryId: 'image-ai',
    description: 'Enhance and upscale your images up to 4x resolution directly in your browser.',
    inputType: 'file',
    demoPlaceholder: 'Upload an image to upscale...',
    features: [
      {
        title: 'Up to 4x Upscaling',
        description: 'Increase resolution by 2x, 3x, or 4x without pixelation.',
      },
      {
        title: 'Smart Sharpening',
        description: 'Enhance details and edges with adjustable sharpening.',
      },
      {
        title: 'Contrast Boost',
        description: 'Improve image clarity with optional contrast enhancement.',
      },
      {
        title: 'Private & Secure',
        description: 'All processing happens locally on your device.',
      },
    ],
    howTo: [
      {
        step: 1,
        title: 'Upload Image',
        description: 'Select the image you want to upscale (JPEG, PNG, WebP).',
      },
      {
        step: 2,
        title: 'Choose Settings',
        description: 'Select scale factor (2x-4x) and sharpening level.',
      },
      {
        step: 3,
        title: 'Process & Download',
        description: 'Click "Upscale" and download your enhanced image.',
      },
    ],
    useCases: [
      {
        title: 'Printing',
        description: 'Prepare low-res images for high-quality printing.',
      },
      {
        title: 'Web Design',
        description: 'Upscale assets for high-DPI displays.',
      },
      {
        title: 'Restoration',
        description: 'Improve quality of old or small digital photos.',
      },
      {
        title: 'E-commerce',
        description: 'Enhance product photos for better listing quality.',
      },
    ],
    relatedTools: [
      {
        id: 'image-resizer',
        name: 'Image Resizer',
        description: 'Resize images to any dimension',
        category: 'Image AI',
      },
      {
        id: 'background-remover',
        name: 'Background Remover',
        description: 'Remove backgrounds from images',
        category: 'Image AI',
      },
    ],
    faqs: [
      {
        id: 'faq1',
        question: 'Is it free?',
        answer: 'Yes, 100% free and unlimited usage.',
      },
      {
        id: 'faq2',
        question: 'Do you store my photos?',
        answer: 'No. Processing is done in your browser; we never see your files.',
      },
      {
        id: 'faq3',
        question: 'What is the max resolution?',
        answer: 'Output is limited to 4096x4096px for performance reasons.',
      },
    ],
  },
  'background-remover': {
    id: 'background-remover',
    name: 'Background Remover',
    category: 'Image AI',
    categoryId: 'image-ai',
    description: 'Remove backgrounds from images automatically with one click using AI.',
    inputType: 'file',
    demoPlaceholder: 'Upload an image...',
    features: [
      {
        title: 'One-Click Removal',
        description: 'Remove backgrounds instantly with a single click.',
      },
      {
        title: 'High Precision',
        description: 'AI-powered edge detection ensures clean, precise background removal.',
      },
      {
        title: 'Transparency Support',
        description: 'Output PNG images with transparent backgrounds.',
      },
      {
        title: 'Batch Processing',
        description: 'Remove backgrounds from multiple images at once.',
      },
    ],
    howTo: [
      {
        step: 1,
        title: 'Upload Image',
        description: 'Click or drag an image to upload it.',
      },
      {
        step: 2,
        title: 'Process',
        description: 'The AI automatically removes the background.',
      },
      {
        step: 3,
        title: 'Download',
        description: 'Save your image with a transparent background.',
      },
    ],
    useCases: [
      {
        title: 'Product Photos',
        description: 'Prepare product images for e-commerce listings.',
      },
      {
        title: 'Profile Pictures',
        description: 'Create professional headshots with clean backgrounds.',
      },
      {
        title: 'Design Projects',
        description: 'Isolate subjects for graphic design work.',
      },
      {
        title: 'Presentations',
        description: 'Prepare images for slides and documents.',
      },
    ],
    relatedTools: [
      {
        id: 'image-resizer',
        name: 'Image Resizer',
        description: 'Resize images to any dimensions',
        category: 'Image AI',
      },
      {
        id: 'image-upscaler',
        name: 'Image Upscaler',
        description: 'Enhance and upscale images with AI',
        category: 'Image AI',
      },
    ],
    faqs: [
      {
        id: 'faq1',
        question: 'What image formats are supported?',
        answer: 'JPG, PNG, WebP, and GIF are supported. Output is PNG with transparency.',
      },
      {
        id: 'faq2',
        question: 'How does it handle complex edges?',
        answer: 'Our AI model is trained to handle hair, fur, and other complex edges precisely.',
      },
      {
        id: 'faq3',
        question: 'What is the maximum file size?',
        answer: 'Up to 50MB per file. For larger images, compress first.',
      },
    ],
  },
  'image-resizer': {
    id: 'image-resizer',
    name: 'Image Resizer',
    category: 'Image AI',
    categoryId: 'image-ai',
    description: 'Resize images to any dimensions while maintaining quality.',
    inputType: 'file',
    demoPlaceholder: 'Upload an image...',
    features: [
      {
        title: 'Smart Resizing',
        description: 'AI-powered resizing maintains quality at any size.',
      },
      {
        title: 'Custom Dimensions',
        description: 'Set exact width and height or choose from presets.',
      },
      {
        title: 'Aspect Ratio Control',
        description: 'Maintain or adjust the aspect ratio as needed.',
      },
      {
        title: 'Format Conversion',
        description: 'Save in JPG, PNG, WebP, or GIF formats.',
      },
    ],
    howTo: [
      {
        step: 1,
        title: 'Upload Image',
        description: 'Upload the image you want to resize.',
      },
      {
        step: 2,
        title: 'Set Dimensions',
        description: 'Enter desired width and height or choose presets.',
      },
      {
        step: 3,
        title: 'Download',
        description: 'Download your resized image.',
      },
    ],
    useCases: [
      {
        title: 'Web Optimization',
        description: 'Resize images for faster website loading.',
      },
      {
        title: 'Social Media',
        description: 'Prepare images for different platform requirements.',
      },
      {
        title: 'Thumbnails',
        description: 'Create thumbnail versions of images.',
      },
      {
        title: 'Bulk Resizing',
        description: 'Process multiple images to consistent sizes.',
      },
    ],
    relatedTools: [
      {
        id: 'background-remover',
        name: 'Background Remover',
        description: 'Remove backgrounds from images automatically',
        category: 'Image AI',
      },
      {
        id: 'image-upscaler',
        name: 'Image Upscaler',
        description: 'Enhance and upscale images with AI',
        category: 'Image AI',
      },
    ],
    faqs: [
      {
        id: 'faq1',
        question: 'Does resizing reduce quality?',
        answer: 'Our AI interpolation minimizes quality loss. Downscaling maintains more quality than traditional methods.',
      },
      {
        id: 'faq2',
        question: 'Can I maintain aspect ratio?',
        answer: 'Yes, you can lock aspect ratio or freely set dimensions.',
      },
    ],
  },
  'image-upscaler': {
    id: 'image-upscaler',
    name: 'Image Upscaler',
    category: 'Image AI',
    categoryId: 'image-ai',
    description: 'Enhance and upscale low-resolution images using advanced AI.',
    inputType: 'file',
    demoPlaceholder: 'Upload an image...',
    features: [
      {
        title: 'AI Upscaling',
        description: 'Uses deep learning to intelligently upscale images.',
      },
      {
        title: 'Multiple Scales',
        description: 'Upscale by 2x, 3x, or 4x without quality loss.',
      },
      {
        title: 'Detail Enhancement',
        description: 'Sharpens details and improves overall clarity.',
      },
      {
        title: 'Noise Reduction',
        description: 'Reduces noise while upscaling.',
      },
    ],
    howTo: [
      {
        step: 1,
        title: 'Upload Image',
        description: 'Upload the low-resolution image.',
      },
      {
        step: 2,
        title: 'Choose Scale',
        description: 'Select how many times to upscale (2x, 3x, or 4x).',
      },
      {
        step: 3,
        title: 'Download',
        description: 'Download your enhanced, larger image.',
      },
    ],
    useCases: [
      {
        title: 'Old Photos',
        description: 'Restore and enlarge old or low-quality photos.',
      },
      {
        title: 'Printing',
        description: 'Prepare small images for large format printing.',
      },
      {
        title: 'Gaming Assets',
        description: 'Upscale game graphics and textures.',
      },
      {
        title: 'Archival Work',
        description: 'Enhance digitized historical images.',
      },
    ],
    relatedTools: [
      {
        id: 'background-remover',
        name: 'Background Remover',
        description: 'Remove backgrounds from images automatically',
        category: 'Image AI',
      },
      {
        id: 'image-resizer',
        name: 'Image Resizer',
        description: 'Resize images to any dimensions',
        category: 'Image AI',
      },
    ],
    faqs: [
      {
        id: 'faq1',
        question: 'What is the maximum upscale factor?',
        answer: 'You can upscale up to 4x the original size with good quality.',
      },
      {
        id: 'faq2',
        question: 'Does it work with very small images?',
        answer: 'Best results with images at least 100x100 pixels. Smaller images may have limitations.',
      },
      {
        id: 'faq3',
        question: 'How long does upscaling take?',
        answer: 'Processing typically takes 30-60 seconds depending on image size and scale factor.',
      },
    ],
  },
  'text-to-speech': {
    id: 'text-to-speech',
    name: 'Text to Speech',
    category: 'Audio AI',
    categoryId: 'audio-ai',
    description: 'Convert written text into natural-sounding audio with multiple voices.',
    inputType: 'textarea',
    demoPlaceholder: 'Enter text to convert to speech...',
    features: [
      {
        title: 'Natural Voices',
        description: '50+ AI voices in multiple languages.',
      },
      {
        title: 'Speed Control',
        description: 'Adjust playback speed from 0.5x to 2x.',
      },
      {
        title: 'Multiple Languages',
        description: 'Supports English, Spanish, French, German, and more.',
      },
      {
        title: 'Download Audio',
        description: 'Save as MP3 or WAV files.',
      },
    ],
    howTo: [
      {
        step: 1,
        title: 'Enter Text',
        description: 'Type or paste the text you want converted to speech.',
      },
      {
        step: 2,
        title: 'Choose Voice',
        description: 'Select from available voices and adjust speed if needed.',
      },
      {
        step: 3,
        title: 'Generate and Download',
        description: 'Generate the audio and download it as a file.',
      },
    ],
    useCases: [
      {
        title: 'Accessibility',
        description: 'Create audio versions of written content for accessibility.',
      },
      {
        title: 'Podcasts',
        description: 'Generate voiceovers for podcast content.',
      },
      {
        title: 'E-Learning',
        description: 'Create audio content for online courses.',
      },
      {
        title: 'Audiobooks',
        description: 'Convert written books to audiobook format.',
      },
    ],
    relatedTools: [
      {
        id: 'audio-converter',
        name: 'Audio Converter',
        description: 'Convert audio between different formats',
        category: 'Audio AI',
      },
    ],
    faqs: [
      {
        id: 'faq1',
        question: 'How natural do the voices sound?',
        answer: 'Our voices sound very natural thanks to advanced AI synthesis technology.',
      },
      {
        id: 'faq2',
        question: 'What is the maximum text length?',
        answer: 'Up to 5000 characters per conversion. For longer text, process in sections.',
      },
      {
        id: 'faq3',
        question: 'Can I use it commercially?',
        answer: 'Check our terms of service for commercial use rights.',
      },
    ],
  },
  'audio-converter': {
    id: 'audio-converter',
    name: 'Audio Converter',
    category: 'Audio AI',
    categoryId: 'audio-ai',
    description: 'Convert audio between different formats while maintaining quality.',
    inputType: 'file',
    demoPlaceholder: 'Upload an audio file...',
    features: [
      {
        title: 'Format Support',
        description: 'Supports MP3, WAV, FLAC, OGG, M4A, AAC, and more.',
      },
      {
        title: 'Quality Settings',
        description: 'Choose bitrate and quality settings.',
      },
      {
        title: 'Batch Conversion',
        description: 'Convert multiple files at once.',
      },
      {
        title: 'Fast Processing',
        description: 'Quick conversion without quality loss.',
      },
    ],
    howTo: [
      {
        step: 1,
        title: 'Upload File',
        description: 'Upload the audio file you want to convert.',
      },
      {
        step: 2,
        title: 'Select Format',
        description: 'Choose the output format you need.',
      },
      {
        step: 3,
        title: 'Download',
        description: 'Download your converted audio file.',
      },
    ],
    useCases: [
      {
        title: 'Format Conversion',
        description: 'Convert between different audio formats.',
      },
      {
        title: 'Device Compatibility',
        description: 'Convert audio to formats compatible with your devices.',
      },
      {
        title: 'Compression',
        description: 'Reduce file size while maintaining quality.',
      },
      {
        title: 'Audio Editing',
        description: 'Prepare files for editing in other applications.',
      },
    ],
    relatedTools: [
      {
        id: 'text-to-speech',
        name: 'Text to Speech',
        description: 'Convert text into natural-sounding audio',
        category: 'Audio AI',
      },
    ],
    faqs: [
      {
        id: 'faq1',
        question: 'Does conversion reduce quality?',
        answer: 'Quality depends on your chosen settings. You can maintain high quality or reduce file size.',
      },
      {
        id: 'faq2',
        question: 'What is the maximum file size?',
        answer: 'Up to 100MB files can be converted.',
      },
      {
        id: 'faq3',
        question: 'How long does conversion take?',
        answer: 'Usually 30-120 seconds depending on file size and format.',
      },
    ],
  },
  'youtube-downloader': {
    id: 'youtube-downloader',
    name: 'YouTube Downloader',
    category: 'Video AI',
    categoryId: 'video-ai',
    description: 'Download videos from YouTube and other platforms in various qualities.',
    inputType: 'text',
    demoPlaceholder: 'Paste video URL here...',
    features: [
      {
        title: 'Multiple Qualities',
        description: 'Download in 360p, 720p, 1080p, 2K, or 4K.',
      },
      {
        title: 'Format Options',
        description: 'Save as MP4, WebM, or audio-only MP3.',
      },
      {
        title: 'Fast Downloads',
        description: 'Quick and reliable downloading.',
      },
      {
        title: 'Platform Support',
        description: 'Works with YouTube and similar platforms.',
      },
    ],
    howTo: [
      {
        step: 1,
        title: 'Paste URL',
        description: 'Copy and paste the video URL.',
      },
      {
        step: 2,
        title: 'Choose Quality',
        description: 'Select your desired resolution and format.',
      },
      {
        step: 3,
        title: 'Download',
        description: 'Click download and save the video.',
      },
    ],
    useCases: [
      {
        title: 'Offline Viewing',
        description: 'Save videos for offline viewing.',
      },
      {
        title: 'Content Creation',
        description: 'Download source videos for editing projects.',
      },
      {
        title: 'Education',
        description: 'Save educational videos for learning.',
      },
      {
        title: 'Archiving',
        description: 'Create backups of important videos.',
      },
    ],
    relatedTools: [
      {
        id: 'video-to-gif',
        name: 'Video to GIF',
        description: 'Convert video clips into animated GIFs',
        category: 'Video AI',
      },
    ],
    faqs: [
      {
        id: 'faq1',
        question: 'Is downloading videos legal?',
        answer: 'Respect copyright laws and creator licenses. Only download content you have rights to.',
      },
      {
        id: 'faq2',
        question: 'What quality should I choose?',
        answer: '1080p is ideal for most uses. Choose higher for large screens, lower to save space.',
      },
      {
        id: 'faq3',
        question: 'How large are the files?',
        answer: 'Depends on length and quality. 1080p videos are typically 500MB-2GB per hour.',
      },
    ],
  },
  'video-to-gif': {
    id: 'video-to-gif',
    name: 'Video to GIF',
    category: 'Video AI',
    categoryId: 'video-ai',
    description: 'Convert video clips into animated GIFs easily.',
    inputType: 'file',
    demoPlaceholder: 'Upload a video file...',
    features: [
      {
        title: 'Video Support',
        description: 'Works with MP4, WebM, AVI, and more.',
      },
      {
        title: 'Duration Control',
        description: 'Select specific portions of videos to convert.',
      },
      {
        title: 'Frame Rate Control',
        description: 'Adjust GIF smoothness and file size.',
      },
      {
        title: 'Optimization',
        description: 'Automatically optimized GIFs for web.',
      },
    ],
    howTo: [
      {
        step: 1,
        title: 'Upload Video',
        description: 'Upload or link to the video you want to convert.',
      },
      {
        step: 2,
        title: 'Trim Duration',
        description: 'Select the portion you want to convert to GIF.',
      },
      {
        step: 3,
        title: 'Create and Download',
        description: 'Generate the GIF and download it.',
      },
    ],
    useCases: [
      {
        title: 'Social Media',
        description: 'Create GIFs to share on social platforms.',
      },
      {
        title: 'Reactions',
        description: 'Make reaction GIFs from video clips.',
      },
      {
        title: 'Tutorials',
        description: 'Create animated tutorials and demos.',
      },
      {
        title: 'Presentations',
        description: 'Use GIFs in slideshows and presentations.',
      },
    ],
    relatedTools: [
      {
        id: 'youtube-downloader',
        name: 'YouTube Downloader',
        description: 'Download videos from YouTube and other platforms',
        category: 'Video AI',
      },
    ],
    faqs: [
      {
        id: 'faq1',
        question: 'What is the maximum video length?',
        answer: 'You can convert videos up to 10 minutes long.',
      },
      {
        id: 'faq2',
        question: 'How can I reduce GIF file size?',
        answer: 'Reduce duration, lower frame rate, or reduce colors.',
      },
      {
        id: 'faq3',
        question: 'What file size limit?',
        answer: 'Output GIFs are typically 5-10MB depending on settings.',
      },
    ],
  },
  'resume-improver': {
    id: 'resume-improver',
    name: 'Resume Bullet Improver',
    category: 'Productivity',
    categoryId: 'productivity',
    description: 'Enhance your resume bullet points with strong action verbs and metrics.',
    inputType: 'textarea',
    demoPlaceholder: 'Paste a resume bullet point...',
    features: [
      { title: 'Weak Word Detection', description: 'Identifies weak verbs and suggests stronger alternatives.' },
      { title: 'Metric Suggestions', description: 'Reminds you to add quantifiable results.' },
      { title: 'Structure Check', description: 'Ensures you follow the Context-Action-Result format.' },
      { title: 'Privacy Focused', description: 'All analysis happens locally in your browser.' },
    ],
    howTo: [
      { step: 1, title: 'Paste Bullet Point', description: 'Enter a bullet point from your resume.' },
      { step: 2, title: 'Analyze', description: 'Click improve to see suggestions.' },
      { step: 3, title: 'Refine', description: 'Apply the suggestions to strengthen your resume.' },
    ],
    useCases: [
      { title: 'Job Applications', description: 'Optimize your resume for specific job applications.' },
      { title: 'LinkedIn Profile', description: 'Improve your LinkedIn experience section.' },
      { title: 'Career Growth', description: 'Update your resume with recent achievements.' },
      { title: 'Interview Prep', description: 'Refine your talking points for interviews.' },
    ],
    relatedTools: [
      { id: 'grammar-checker', name: 'Grammar Checker', description: 'Check grammar errors', category: 'Text AI' },
    ],
    faqs: [
      { id: 'faq1', question: 'Is my resume stored?', answer: 'No, all analysis is done locally in your browser.' },
      { id: 'faq2', question: 'Does it rewrite for me?', answer: 'It provides suggestions and structure, but you write the final content.' },
    ],
  },
  'password-generator': {
    id: 'password-generator',
    name: 'Password Generator',
    category: 'Security',
    categoryId: 'security',
    description: 'Generate strong, secure passwords locally in your browser.',
    inputType: 'text',
    demoPlaceholder: 'Generated password will appear here...',
    features: [
      { title: 'Custom Length', description: 'Generate passwords from 8 to 64 characters.' },
      { title: 'Character Sets', description: 'Toggle uppercase, lowercase, numbers, and symbols.' },
      { title: 'Client-Side', description: 'Passwords are generated locally and never sent to a server.' },
      { title: 'Copy to Clipboard', description: 'One-click copy for convenience.' },
    ],
    howTo: [
      { step: 1, title: 'Select Options', description: 'Choose length and character types.' },
      { step: 2, title: 'Generate', description: 'Click generate to create a new password.' },
      { step: 3, title: 'Copy', description: 'Copy the password to your clipboard.' },
    ],
    useCases: [
      { title: 'Account Security', description: 'Create unique passwords for every account.' },
      { title: 'WiFi Passwords', description: 'Generate strong keys for your network.' },
      { title: 'Temporary Access', description: 'Create secure temporary passwords.' },
      { title: 'Compliance', description: 'Meet password complexity requirements.' },
    ],
    relatedTools: [],
    faqs: [
      { id: 'faq1', question: 'Is it safe?', answer: 'Yes, 100% safe. Passwords never leave your browser.' },
      { id: 'faq2', question: 'Can you recover my password?', answer: 'No, we do not store any generated passwords.' },
    ],
  },
  'title-generator': {
    id: 'title-generator',
    name: 'Title Generator',
    category: 'Text AI',
    categoryId: 'text-ai',
    description: 'Generate catchy, SEO-friendly titles and headlines for your content.',
    inputType: 'textarea',
    demoPlaceholder: 'Describe your content...',
    features: [
      { title: 'Multiple Styles', description: 'Generate clickbait, professional, or question-based titles.' },
      { title: 'SEO Optimized', description: 'Titles designed to improve click-through rates.' },
      { title: 'Bulk Generation', description: 'Get 5-10 options in one go.' },
      { title: 'AI Powered', description: 'Uses advanced language models for creativity.' },
    ],
    howTo: [
      { step: 1, title: 'Describe Content', description: 'Enter a summary or topic of your content.' },
      { step: 2, title: 'Select Style', description: 'Choose the tone you want for your titles.' },
      { step: 3, title: 'Generate', description: 'Get a list of title options instantly.' },
    ],
    useCases: [
      { title: 'Blog Posts', description: 'Create engaging headlines for articles.' },
      { title: 'YouTube Videos', description: 'Generate click-worthy video titles.' },
      { title: 'Email Subject Lines', description: 'Improve email open rates.' },
      { title: 'Social Media', description: 'Catch attention on social feeds.' },
    ],
    relatedTools: [
      { id: 'seo-generator', name: 'SEO Generator', description: 'Generate meta tags', category: 'Text AI' },
    ],
    faqs: [
      { id: 'faq1', question: 'Are these titles unique?', answer: 'Yes, they are generated specifically for your input.' },
      { id: 'faq2', question: 'Can I use them for YouTube?', answer: 'Absolutely, they work great for video titles.' },
    ],
  },
  'seo-generator': {
    id: 'seo-generator',
    name: 'SEO Generator',
    category: 'Text AI',
    categoryId: 'text-ai',
    description: 'Generate optimized meta titles, descriptions, and keywords for better ranking.',
    inputType: 'textarea',
    demoPlaceholder: 'Enter your content...',
    features: [
      { title: 'Meta Tags', description: 'Generates title tags and meta descriptions.' },
      { title: 'Keyword Extraction', description: 'Identifies relevant keywords from your text.' },
      { title: 'Character Counts', description: 'Ensures tags fit within search engine limits.' },
      { title: 'AI Analysis', description: 'Understands content context for better relevance.' },
    ],
    howTo: [
      { step: 1, title: 'Enter Content', description: 'Paste your article or product description.' },
      { step: 2, title: 'Generate', description: 'Click to create SEO metadata.' },
      { step: 3, title: 'Implement', description: 'Copy and paste into your website CMS.' },
    ],
    useCases: [
      { title: 'Website Pages', description: 'Optimize landing pages and blog posts.' },
      { title: 'E-commerce', description: 'Generate SEO tags for product pages.' },
      { title: 'Content Marketing', description: 'Improve visibility of your content.' },
      { title: 'Local SEO', description: 'Optimize for local search terms.' },
    ],
    relatedTools: [
      { id: 'title-generator', name: 'Title Generator', description: 'Generate headlines', category: 'Text AI' },
    ],
    faqs: [
      { id: 'faq1', question: 'Does this guarantee rankings?', answer: 'It helps, but rankings depend on many factors.' },
      { id: 'faq2', question: 'What is the character limit?', answer: 'We follow standard limits: 60 for titles, 160 for descriptions.' },
    ],
  },
  'email-rewriter': {
    id: 'email-rewriter',
    name: 'Email Rewriter',
    category: 'Text AI',
    categoryId: 'text-ai',
    description: 'Rewrite your emails in different professional or casual styles.',
    inputType: 'textarea',
    demoPlaceholder: 'Paste your email draft...',
    features: [
      { title: 'Style Presets', description: 'Professional, Friendly, Urgent, Persuasive, and more.' },
      { title: 'Tone Adjustment', description: 'Change the tone without losing the message.' },
      { title: 'Clarity Improvement', description: 'Makes your emails clearer and more effective.' },
      { title: 'Time Saving', description: 'Quickly polish drafts into sendable emails.' },
    ],
    howTo: [
      { step: 1, title: 'Draft Email', description: 'Write a rough draft of your email.' },
      { step: 2, title: 'Choose Style', description: 'Select the desired tone.' },
      { step: 3, title: 'Rewrite', description: 'Get a polished version instantly.' },
    ],
    useCases: [
      { title: 'Business Communication', description: 'Ensure professional correspondence.' },
      { title: 'Sales Outreach', description: 'Write persuasive cold emails.' },
      { title: 'Difficult Conversations', description: 'Find the right words for sensitive topics.' },
      { title: 'Quick Replies', description: 'Turn brief notes into full responses.' },
    ],
    relatedTools: [
      { id: 'grammar-checker', name: 'Grammar Checker', description: 'Fix grammar errors', category: 'Text AI' },
    ],
    faqs: [
      { id: 'faq1', question: 'Is my email private?', answer: 'We process text via secure AI and do not store it.' },
      { id: 'faq2', question: 'Can it translate?', answer: 'It is best for rewriting in the same language.' },
    ],
  },
  'keyword-clustering': {
    id: 'keyword-clustering',
    name: 'Keyword Clustering',
    category: 'Text AI',
    categoryId: 'text-ai',
    description: 'Group large lists of keywords into semantic clusters for SEO strategy.',
    inputType: 'textarea',
    demoPlaceholder: 'Paste keyword list...',
    features: [
      { title: 'Semantic Grouping', description: 'Groups keywords by meaning and intent.' },
      { title: 'Topic Discovery', description: 'Identifies main topics within your keyword list.' },
      { title: 'Content Planning', description: 'Helps structure content hubs and silos.' },
      { title: 'Bulk Processing', description: 'Handle dozens of keywords at once.' },
    ],
    howTo: [
      { step: 1, title: 'Paste Keywords', description: 'Enter your list of keywords.' },
      { step: 2, title: 'Cluster', description: 'Let AI analyze and group them.' },
      { step: 3, title: 'Export', description: 'Use the clusters for your content strategy.' },
    ],
    useCases: [
      { title: 'SEO Strategy', description: 'Plan website structure and content.' },
      { title: 'PPC Campaigns', description: 'Organize ad groups effectively.' },
      { title: 'Market Research', description: 'Understand user search intent.' },
      { title: 'Content Calendar', description: 'Plan articles based on topic clusters.' },
    ],
    relatedTools: [
      { id: 'seo-generator', name: 'SEO Generator', description: 'Generate meta tags', category: 'Text AI' },
    ],
    faqs: [
      { id: 'faq1', question: 'How many keywords can I check?', answer: 'Current limit is about 50-100 keywords per batch.' },
      { id: 'faq2', question: 'What logic is used?', answer: 'We use semantic AI to understand the meaning behind keywords.' },
    ],
  },
  'text-summarizer': {
    id: 'text-summarizer',
    name: 'Text Summarizer',
    category: 'Text AI',
    categoryId: 'text-ai',
    description: 'Summarize any text into concise paragraphs or bullet points.',
    inputType: 'textarea',
    demoPlaceholder: 'Paste text to summarize...',
    features: [
      { title: 'Adjustable Length', description: 'Choose between short, medium, or long summaries.' },
      { title: 'Format Options', description: 'Get results as paragraphs or bullet points.' },
      { title: 'Key Point Extraction', description: 'Identifies the most important information.' },
      { title: 'Fast Processing', description: 'Summarize long text in seconds.' },
    ],
    howTo: [
      { step: 1, title: 'Paste Text', description: 'Enter the text you want to summarize.' },
      { step: 2, title: 'Select Options', description: 'Choose length and format.' },
      { step: 3, title: 'Summarize', description: 'Get your summary instantly.' },
    ],
    useCases: [
      { title: 'Reading', description: 'Quickly digest long articles or reports.' },
      { title: 'Writing', description: 'Create abstracts or executive summaries.' },
      { title: 'Studying', description: 'Review key concepts from notes.' },
      { title: 'Research', description: 'Scan multiple documents efficiently.' },
    ],
    relatedTools: [
      { id: 'article-summarizer', name: 'Article Summarizer', description: 'Summarize articles', category: 'Text AI' },
    ],
    faqs: [
      { id: 'faq1', question: 'How is this different from Article Summarizer?', answer: 'This is optimized for general text snippets, while Article Summarizer is tuned for full articles.' },
      { id: 'faq2', question: 'Is there a word limit?', answer: 'Supports up to ~3000 words per request.' },
    ],
  },
  'password-generator': {
    id: 'password-generator',
    name: 'Password Generator',
    category: 'Productivity',
    categoryId: 'productivity',
    description: 'Create strong, secure passwords for all your accounts.',
    inputType: 'text',
    demoPlaceholder: 'No input needed - just generate!',
    features: [
      { title: 'Customizable Length', description: 'Set password length from 8 to 128 characters.' },
      { title: 'Character Options', description: 'Include uppercase, lowercase, numbers, and symbols.' },
      { title: 'One-Click Generation', description: 'Generate new passwords instantly.' },
      { title: 'Secure & Private', description: 'Generated locally, nothing is stored or logged.' },
    ],
    howTo: [
      { step: 1, title: 'Configure Options', description: 'Choose password length and character types.' },
      { step: 2, title: 'Generate', description: 'Click to generate a strong password.' },
      { step: 3, title: 'Copy', description: 'Copy the password and use it.' },
    ],
    useCases: [
      { title: 'Account Security', description: 'Generate unique passwords for every account.' },
      { title: 'Admin Tasks', description: 'Create temporary passwords for users.' },
    ],
    relatedTools: [
      { id: 'qr-code-generator', name: 'QR Code Generator', description: 'Generate QR codes', category: 'Productivity' },
    ],
    faqs: [
      { id: 'faq1', question: 'Is it secure?', answer: 'Yes, it uses your browser\'s cryptographic random generator.' },
    ],
  },
  'qr-code-generator': {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    category: 'Productivity',
    categoryId: 'productivity',
    description: 'Generate QR codes from text, URLs, and contact information.',
    inputType: 'text',
    demoPlaceholder: 'Enter text or URL...',
    features: [
      { title: 'Instant Generation', description: 'See the QR code update as you type.' },
      { title: 'Downloadable', description: 'Save as PNG for use in print or web.' },
      { title: 'Multiple Types', description: 'Support for URLs, text, and more.' },
      { title: 'Privacy Focused', description: 'Generated securely via reliable API.' },
    ],
    howTo: [
      { step: 1, title: 'Enter Data', description: 'Type the URL or text you want to encode.' },
      { step: 2, title: 'Adjust Size', description: 'Use the slider to change the size.' },
      { step: 3, title: 'Download', description: 'Save the QR code image.' },
    ],
    useCases: [
      { title: 'Marketing', description: 'Share website links on flyers.' },
      { title: 'WiFi Access', description: 'Share network credentials easily.' },
    ],
    relatedTools: [
      { id: 'password-generator', name: 'Password Generator', description: 'Generate passwords', category: 'Productivity' },
    ],
    faqs: [
      { id: 'faq1', question: 'Does it expire?', answer: 'No, standard QR codes never expire.' },
    ],
  },
  'unit-converter': {
    id: 'unit-converter',
    name: 'Unit Converter',
    category: 'Productivity',
    categoryId: 'productivity',
    description: 'Convert between common units of length, weight, and temperature.',
    inputType: 'text',
    demoPlaceholder: 'Enter value...',
    features: [
      { title: 'Multi-Category', description: 'Support for Length, Weight, and Temperature.' },
      { title: 'Instant Conversion', description: 'Results appear as you type.' },
      { title: 'Common Units', description: 'Includes metric and imperial units.' },
      { title: 'Simple Interface', description: 'Clean and easy to use.' },
    ],
    howTo: [
      { step: 1, title: 'Select Category', description: 'Choose Length, Weight, or Temperature.' },
      { step: 2, title: 'Enter Value', description: 'Type the number you want to convert.' },
      { step: 3, title: 'Select Units', description: 'Choose source and target units.' },
    ],
    useCases: [
      { title: 'Cooking', description: 'Convert recipes between metric and imperial.' },
      { title: 'Travel', description: 'Understand distances and temperatures abroad.' },
      { title: 'Education', description: 'Help with math and science homework.' },
    ],
    relatedTools: [
      { id: 'file-converter', name: 'File Converter', description: 'Convert files', category: 'Productivity' },
    ],
    faqs: [
      { id: 'faq1', question: 'Is it accurate?', answer: 'Yes, uses standard conversion factors.' },
    ],
  },
  'file-converter': {
    id: 'file-converter',
    name: 'Universal File Converter',
    category: 'Productivity',
    categoryId: 'productivity',
    description: 'Convert images and data formats directly in your browser.',
    inputType: 'file',
    demoPlaceholder: 'Upload file...',
    features: [
      { title: 'Image Conversion', description: 'Convert between PNG, JPEG, and WEBP.' },
      { title: 'Data Conversion', description: 'Convert JSON to CSV and vice versa.' },
      { title: 'Client-Side', description: 'Files never leave your device.' },
      { title: 'Fast & Secure', description: 'Instant processing with no upload wait time.' },
    ],
    howTo: [
      { step: 1, title: 'Choose Mode', description: 'Select Image or Data converter.' },
      { step: 2, title: 'Upload/Paste', description: 'Select your file or paste your data.' },
      { step: 3, title: 'Convert', description: 'Download your converted file.' },
    ],
    useCases: [
      { title: 'Web Development', description: 'Optimize images for the web.' },
      { title: 'Data Analysis', description: 'Prepare data for spreadsheets.' },
      { title: 'Content Creation', description: 'Fix image formats for social media.' },
    ],
    relatedTools: [
      { id: 'image-compressor', name: 'Image Compressor', description: 'Compress images', category: 'Image' },
    ],
    faqs: [
      { id: 'faq1', question: 'Are my files uploaded?', answer: 'No, all conversion happens locally in your browser.' },
      { id: 'faq2', question: 'What formats are supported?', answer: 'Images (PNG/JPG/WEBP) and Text Data (JSON/CSV).' },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(toolData).map((id) => ({
    id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tool = toolData[id];
  
  if (!tool) {
    return {
      title: 'Tool Not Found - FreeHubTools',
      description: 'The requested tool could not be found.',
    };
  }

  return {
    title: `${tool.name} - FreeHubTools`,
    description: tool.description,
  };
}

export default async function ToolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tool = toolData[id];

  if (!tool) {
    notFound();
  }

  return <ToolClient tool={tool} />;
}
