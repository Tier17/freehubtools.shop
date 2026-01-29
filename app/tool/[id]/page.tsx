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
  'password-generator': {
    id: 'password-generator',
    name: 'Password Generator',
    category: 'Productivity',
    categoryId: 'productivity',
    description: 'Create strong, secure passwords for all your accounts.',
    inputType: 'text',
    demoPlaceholder: 'No input needed - just generate!',
    features: [
      {
        title: 'Customizable Length',
        description: 'Set password length from 8 to 128 characters.',
      },
      {
        title: 'Character Options',
        description: 'Include uppercase, lowercase, numbers, and symbols.',
      },
      {
        title: 'One-Click Generation',
        description: 'Generate new passwords instantly.',
      },
      {
        title: 'Secure & Private',
        description: 'Generated locally, nothing is stored or logged.',
      },
    ],
    howTo: [
      {
        step: 1,
        title: 'Configure Options',
        description: 'Choose password length and character types.',
      },
      {
        step: 2,
        title: 'Generate',
        description: 'Click to generate a strong password.',
      },
      {
        step: 3,
        title: 'Copy and Use',
        description: 'Copy the password and use it for your account.',
      },
    ],
    useCases: [
      {
        title: 'Account Creation',
        description: 'Generate secure passwords for new accounts.',
      },
      {
        title: 'Password Updates',
        description: 'Create new passwords when updating existing accounts.',
      },
      {
        title: 'System Admin',
        description: 'Generate passwords for user accounts.',
      },
      {
        title: 'Security Audit',
        description: 'Create strong replacement passwords.',
      },
    ],
    relatedTools: [
      {
        id: 'qr-code-generator',
        name: 'QR Code Generator',
        description: 'Generate QR codes from text, URLs, and contact info',
        category: 'Productivity',
      },
    ],
    faqs: [
      {
        id: 'faq1',
        question: 'How secure are generated passwords?',
        answer: 'Using cryptographic randomization, our passwords are highly secure.',
      },
      {
        id: 'faq2',
        question: 'Can I customize requirements?',
        answer: 'Yes, exclude or include specific character types as needed.',
      },
      {
        id: 'faq3',
        question: 'Are passwords logged?',
        answer: 'No, everything is generated locally. We do not store or log anything.',
      },
    ],
  },
  'qr-code-generator': {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    category: 'Productivity',
    categoryId: 'productivity',
    description: 'Generate QR codes from text, URLs, and contact information.',
    inputType: 'text',
    demoPlaceholder: 'Enter text or URL to encode...',
    features: [
      {
        title: 'Multiple Data Types',
        description: 'Encode URLs, text, contact info, WiFi, and more.',
      },
      {
        title: 'Size & Format',
        description: 'Download as PNG or SVG in any size.',
      },
      {
        title: 'Error Correction',
        description: 'Built-in error correction for reliability.',
      },
      {
        title: 'Custom Design',
        description: 'Color customization options available.',
      },
    ],
    howTo: [
      {
        step: 1,
        title: 'Enter Data',
        description: 'Type or paste the URL, text, or contact info.',
      },
      {
        step: 2,
        title: 'Generate',
        description: 'Instantly generate your QR code.',
      },
      {
        step: 3,
        title: 'Download',
        description: 'Download in PNG or SVG format.',
      },
    ],
    useCases: [
      {
        title: 'Marketing',
        description: 'Include QR codes in advertisements and marketing materials.',
      },
      {
        title: 'Contact Info',
        description: 'Share contact details via QR codes.',
      },
      {
        title: 'WiFi Sharing',
        description: 'Generate QR codes for easy WiFi connection.',
      },
      {
        title: 'Event Tickets',
        description: 'Create QR codes for event check-in.',
      },
    ],
    relatedTools: [
      {
        id: 'password-generator',
        name: 'Password Generator',
        description: 'Create strong, secure passwords for all your accounts',
        category: 'Productivity',
      },
    ],
    faqs: [
      {
        id: 'faq1',
        question: 'What can I encode in a QR code?',
        answer: 'URLs, plain text, contact info, WiFi credentials, phone numbers, emails, and more.',
      },
      {
        id: 'faq2',
        question: 'Is there a character limit?',
        answer: 'Typically up to 4,296 characters depending on data type.',
      },
      {
        id: 'faq3',
        question: 'Can I customize the design?',
        answer: 'Yes, color customization is available. More design options coming soon.',
      },
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
