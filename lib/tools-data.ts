export interface ToolData {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  description: string;
  imageUrl?: string;
  inputType: 'text' | 'file' | 'textarea';
  beta?: boolean;
  privacyNote?: string;
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

export const toolData: Record<string, ToolData> = {
  'pdf-editor': {
    id: 'pdf-editor',
    name: 'PDF Editor',
    category: 'Productivity',
    categoryId: 'productivity',
    description: 'Edit, sign, and annotate PDF documents directly in your browser.',
    imageUrl: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    inputType: 'file',
    privacyNote: 'Files are processed locally in your browser for maximum security.',
    demoPlaceholder: 'Upload a PDF to edit...',
    features: [
      {
        title: 'Advanced Text Editing',
        description: 'Add, edit, and style text directly on your PDF documents with full font support.',
      },
      {
        title: 'Professional Annotation',
        description: 'Highlight, underline, and draw shapes to emphasize key information.',
      },
      {
        title: 'Secure Redaction',
        description: 'Permanently hide sensitive data like social security numbers or addresses.',
      },
      {
        title: 'Image Integration',
        description: 'Seamlessly insert logos, signatures, and photos into your PDF pages.',
      },
    ],
    howTo: [
      {
        step: 1,
        title: 'Upload PDF',
        description: 'Drag and drop or select the PDF file you want to edit.',
      },
      {
        step: 2,
        title: 'Make Changes',
        description: 'Use the toolbar to add text, images, signatures, or annotations.',
      },
      {
        step: 3,
        title: 'Download',
        description: 'Save your edited PDF document instantly without watermarks.',
      },
    ],
    useCases: [
      {
        title: 'Legal Contracts',
        description: 'Sign and fill out agreements and legal documents securely.',
      },
      {
        title: 'Study & Research',
        description: 'Annotate lecture slides, textbooks, and research papers.',
      },
      {
        title: 'Business Forms',
        description: 'Fill out application forms, invoices, and reports digitally.',
      },
      {
        title: 'Team Collaboration',
        description: 'Add comments and feedback to shared documents for review.',
      },
    ],
    relatedTools: [
      {
        id: 'article-summarizer',
        name: 'Article Summarizer',
        description: 'Summarize long documents',
        category: 'Text AI',
      },
      {
        id: 'file-converter',
        name: 'File Converter',
        description: 'Convert PDFs to other formats',
        category: 'Productivity',
      },
    ],
    faqs: [
      {
        id: 'pdf-editor-faq1',
        question: 'Is it secure?',
        answer: 'Yes, files are processed locally in your browser whenever possible for maximum security.',
      },
      {
        id: 'pdf-editor-faq2',
        question: 'Can I edit scanned PDFs?',
        answer: 'Basic annotation works on scans. Full text editing requires OCR (coming soon).',
      },
      {
        id: 'pdf-editor-faq3',
        question: 'Is it free?',
        answer: 'Yes, the basic PDF editor is completely free to use without limits.',
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
        id: 'image-resizer-faq-1',
        question: 'Is it free?',
        answer: 'Yes, this tool is 100% free to use.',
      },
      {
        id: 'image-resizer-faq-2',
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
        id: 'image-compressor-faq1',
        question: 'How much space can I save?',
        answer: 'Typically 50-80% reduction depending on the image.',
      },
      {
        id: 'image-compressor-faq2',
        question: 'Does it affect quality?',
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
    imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    inputType: 'textarea',
    demoPlaceholder: 'Paste your article here...',
    features: [
      {
        title: 'AI-Powered Analysis',
        description: 'Uses advanced natural language processing to understand and distill complex texts.',
      },
      {
        title: 'Custom Lengths',
        description: 'Choose between bullet points, short paragraphs, or detailed executive summaries.',
      },
      {
        title: 'Key Point Extraction',
        description: 'Automatically identifies and highlights the most critical arguments and facts.',
      },
      {
        title: 'Multi-Language Support',
        description: 'Summarize content in English, Spanish, French, German, and 20+ other languages.',
      },
    ],
    howTo: [
      {
        step: 1,
        title: 'Input Text',
        description: 'Paste your article, report, or essay into the text area.',
      },
      {
        step: 2,
        title: 'Select Options',
        description: 'Choose your desired summary length and format style.',
      },
      {
        step: 3,
        title: 'Summarize',
        description: 'Click the button to generate a concise, accurate summary in seconds.',
      },
    ],
    useCases: [
      {
        title: 'Academic Research',
        description: 'Quickly scan through dozens of papers to find relevant information.',
      },
      {
        title: 'Business Intelligence',
        description: 'Digest long market reports and competitor analysis in minutes.',
      },
      {
        title: 'News Consumption',
        description: 'Stay informed by reading the core facts of news stories without the fluff.',
      },
      {
        title: 'Content Creation',
        description: 'Generate social media captions and tl;dr versions of your blog posts.',
      },
    ],
    relatedTools: [
      {
        id: 'paraphraser',
        name: 'Paraphraser',
        description: 'Rewrite text professionally',
        category: 'Text AI',
      },
      {
        id: 'title-generator',
        name: 'Title Generator',
        description: 'Create catchy headlines',
        category: 'Text AI',
      },
    ],
    faqs: [
      {
        id: 'article-summarizer-faq1',
        question: 'Is the summary accurate?',
        answer: 'Our AI is trained to maintain high factual accuracy and preserve the original context.',
      },
      {
        id: 'article-summarizer-faq2',
        question: 'Is there a word limit?',
        answer: 'The free version supports up to 5,000 words per summary request.',
      },
      {
        id: 'article-summarizer-faq3',
        question: 'Can I summarize PDFs?',
        answer: 'Currently, you need to copy-paste the text. PDF upload support is coming soon.',
      },
    ],
  },
  'paraphraser': {
    id: 'paraphraser',
    name: 'Paraphraser',
    category: 'Text AI',
    categoryId: 'text-ai',
    description: 'Rephrase text in different styles and tones while maintaining the original meaning.',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    inputType: 'textarea',
    demoPlaceholder: 'Enter the text you want to paraphrase...',
    features: [
      {
        title: 'Context-Aware Rewriting',
        description: 'Understand nuances to rewrite sentences accurately without losing meaning.',
      },
      {
        title: 'Style Customization',
        description: 'Switch between Professional, Casual, and Academic tones instantly.',
      },
      {
        title: 'Plagiarism Checker',
        description: 'Ensure your content is unique and original to pass plagiarism detectors.',
      },
      {
        title: 'Vocabulary Boost',
        description: 'Enhance your writing with richer vocabulary and synonym suggestions.',
      },
    ],
    howTo: [
      {
        step: 1,
        title: 'Paste Text',
        description: 'Input the text you want to rewrite into the box.',
      },
      {
        step: 2,
        title: 'Choose Style',
        description: 'Select the tone that fits your audience (e.g., Professional).',
      },
      {
        step: 3,
        title: 'Paraphrase',
        description: 'Click the button to generate a fresh version of your text.',
      },
    ],
    useCases: [
      {
        title: 'Student Essays',
        description: 'Reword research to avoid plagiarism in papers.',
      },
      {
        title: 'Blog Updates',
        description: 'Refresh old content to boost SEO rankings.',
      },
      {
        title: 'Email Drafting',
        description: 'Adjust the tone of your emails for better impact.',
      },
      {
        title: 'Social Media',
        description: 'Adapt content for Twitter, LinkedIn, and Instagram.',
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
        question: 'Is it free?',
        answer: 'Yes, use it unlimited times for free without registration.',
      },
      {
        id: 'faq2',
        question: 'Does it work for SEO?',
        answer: 'Absolutely, it creates unique content that ranks well on search engines.',
      },
      {
        id: 'faq3',
        question: 'Is it secure?',
        answer: 'Your text is processed securely and never stored on our servers.',
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
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    inputType: 'file',
    beta: true,
    privacyNote: 'Images are processed locally on your device.',
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
        id: 'image-upscaler-faq1',
        question: 'Is it free?',
        answer: 'Yes, 100% free and unlimited usage.',
      },
      {
        id: 'image-upscaler-faq2',
        question: 'Do you store my photos?',
        answer: 'No. Processing is done in your browser; we never see your files.',
      },
      {
        id: 'image-upscaler-faq3',
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
    imageUrl: 'https://images.unsplash.com/photo-1633536726481-465c3676851d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    inputType: 'file',
    demoPlaceholder: 'Upload an image...',
    features: [
      { title: 'Instant Cutout', description: 'Remove backgrounds in under 5 seconds.' },
      { title: 'Hair-Level Precision', description: 'Perfectly handles complex edges like hair and fur.' },
      { title: 'Transparent PNG', description: 'Download high-quality images with alpha channels.' },
      { title: 'Magic Editor', description: 'Add new backgrounds or solid colors instantly.' },
    ],
    howTo: [
      { step: 1, title: 'Upload Image', description: 'Select a photo with a clear subject.' },
      { step: 2, title: 'Auto-Remove', description: 'AI automatically detects and deletes the background.' },
      { step: 3, title: 'Edit & Download', description: 'Add a new background or save as transparent PNG.' },
    ],
    useCases: [
      { title: 'Product Photography', description: 'Create professional white-background Amazon listings.' },
      { title: 'Marketing Materials', description: 'Place products or people into new scenes.' },
      { title: 'Profile Pictures', description: 'Create consistent team headshots.' },
      { title: 'Stickers', description: 'Make custom stickers for WhatsApp or Telegram.' },
    ],
    relatedTools: [
      { id: 'image-resizer', name: 'Image Resizer', description: 'Resize images to any dimensions', category: 'Image AI' },
      { id: 'image-upscaler', name: 'Image Upscaler', description: 'Enhance and upscale images with AI', category: 'Image AI' },
    ],
    faqs: [
      { id: 'background-remover-faq1', question: 'Is it accurate?', answer: 'Yes, our model is trained on millions of professional images.' },
      { id: 'background-remover-faq2', question: 'Can I process batches?', answer: 'Currently single image, batch processing coming soon.' },
      { id: 'background-remover-faq3', question: 'Is it free?', answer: 'Yes, remove backgrounds for free without watermarks.' },
    ],
  },
  'text-to-speech': {
    id: 'text-to-speech',
    name: 'Text to Speech',
    category: 'Audio AI',
    categoryId: 'audio-ai',
    description: 'Convert written text into natural-sounding audio with multiple voices.',
    imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    inputType: 'textarea',
    demoPlaceholder: 'Enter text to convert to speech...',
    features: [
      { title: 'Neural Voices', description: 'Choose from 100+ lifelike AI voices.' },
      { title: 'Multilingual', description: 'Generate speech in 30+ languages and accents.' },
      { title: 'Voice Cloning', description: 'Clone your own voice for personalized content (Pro).' },
      { title: 'Emotion Control', description: 'Add happiness, sadness, or excitement to speech.' },
    ],
    howTo: [
      { step: 1, title: 'Enter Script', description: 'Type or paste your text content.' },
      { step: 2, title: 'Select Voice', description: 'Choose a language and voice actor.' },
      { step: 3, title: 'Synthesize', description: 'Generate and download your audio file.' },
    ],
    useCases: [
      { title: 'YouTube Videos', description: 'Create voiceovers without a microphone.' },
      { title: 'E-Learning', description: 'Turn course materials into audio lessons.' },
      { title: 'Podcasts', description: 'Convert articles into listenable episodes.' },
      { title: 'Accessibility', description: 'Make your website content audible.' },
    ],
    relatedTools: [],
    faqs: [
      { id: 'text-to-speech-faq1', question: 'Is it free?', answer: 'Yes, generate unlimited speech for free.' },
      { id: 'text-to-speech-faq2', question: 'Can I monetize?', answer: 'Yes, all audio is royalty-free for commercial use.' },
      { id: 'text-to-speech-faq3', question: 'What formats?', answer: 'Download as high-quality MP3 or WAV.' },
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
      { id: 'resume-improver-faq1', question: 'Is my resume stored?', answer: 'No, all analysis is done locally in your browser.' },
      { id: 'resume-improver-faq2', question: 'Does it rewrite for me?', answer: 'It provides suggestions and structure, but you write the final content.' },
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
      { title: 'Viral Headlines', description: 'Create catchy titles that drive clicks and engagement.' },
      { title: 'SEO Keyword Integration', description: 'Seamlessly include your keywords for better ranking.' },
      { title: 'Platform Specific', description: 'Optimized formats for YouTube, Blogs, and Email.' },
      { title: 'Bulk Ideas', description: 'Generate 10+ unique variations in seconds.' },
    ],
    howTo: [
      { step: 1, title: 'Enter Topic', description: 'Describe your content or paste a draft.' },
      { step: 2, title: 'Choose Platform', description: 'Select where you will use the title (e.g., YouTube).' },
      { step: 3, title: 'Generate', description: 'Get instant access to high-converting headlines.' },
    ],
    useCases: [
      { title: 'YouTube Growth', description: 'Increase click-through rates (CTR) on your videos.' },
      { title: 'Blog Traffic', description: 'Rank higher with SEO-optimized article headers.' },
      { title: 'Email Marketing', description: 'Boost open rates with compelling subject lines.' },
      { title: 'Ad Campaigns', description: 'Create punchy headlines for Facebook and Google ads.' },
    ],
    relatedTools: [
      { id: 'seo-generator', name: 'SEO Generator', description: 'Generate meta tags', category: 'Text AI' },
    ],
    faqs: [
      { id: 'faq1', question: 'Is it free?', answer: 'Yes, generate unlimited titles for free.' },
      { id: 'faq2', question: 'Does it help SEO?', answer: 'Yes, our AI prioritizes high-ranking keywords.' },
      { id: 'faq3', question: 'Can I use these commercially?', answer: 'Yes, all generated titles are royalty-free.' },
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
      { title: 'Complete Meta Tags', description: 'Generate Title Tags, Meta Descriptions, and H1 Headers.' },
      { title: 'SERP Preview', description: 'Visualize how your page will appear in Google search results.' },
      { title: 'Keyword Optimization', description: 'Smartly place keywords to maximize ranking potential.' },
      { title: 'Character Limit Check', description: 'Automatically validates length for Google standards.' },
    ],
    howTo: [
      { step: 1, title: 'Input Details', description: 'Paste your content or topic URL.' },
      { step: 2, title: 'Analyze', description: 'AI scans for the best keyword opportunities.' },
      { step: 3, title: 'Copy Tags', description: 'Copy the optimized meta tags to your CMS.' },
    ],
    useCases: [
      { title: 'Blog Optimization', description: 'Boost organic traffic to your articles.' },
      { title: 'E-Commerce SEO', description: 'Rank your product pages higher in shopping results.' },
      { title: 'Agency Work', description: 'Scale SEO metadata creation for client sites.' },
      { title: 'Landing Pages', description: 'Improve visibility for your key sales pages.' },
    ],
    relatedTools: [
      { id: 'title-generator', name: 'Title Generator', description: 'Generate headlines', category: 'Text AI' },
    ],
    faqs: [
      { id: 'seo-generator-faq1', question: 'Is it updated for 2024?', answer: 'Yes, we follow the latest Google algorithm guidelines.' },
      { id: 'seo-generator-faq2', question: 'Can I do bulk generation?', answer: 'Currently single page, but bulk tools are coming soon.' },
      { id: 'seo-generator-faq3', question: 'Is it free?', answer: 'Yes, generate unlimited SEO tags for free.' },
    ],
  },
  'email-rewriter': {
    id: 'email-rewriter',
    name: 'Email Rewriter',
    category: 'Text AI',
    categoryId: 'text-ai',
    description: 'Rewrite your emails in different professional or casual styles.',
    imageUrl: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    inputType: 'textarea',
    demoPlaceholder: 'Paste your email draft...',
    features: [
      { title: 'Professional Polish', description: 'Turn rough notes into polished, corporate-ready emails.' },
      { title: 'Tone Switcher', description: 'Instantly switch between Friendly, Formal, and Persuasive.' },
      { title: 'Reply Assistant', description: 'Paste an email you received to generate the perfect reply.' },
      { title: 'Spelling & Grammar', description: 'Automatically fixes errors while rewriting.' },
    ],
    howTo: [
      { step: 1, title: 'Paste Draft', description: 'Enter your rough notes or draft email.' },
      { step: 2, title: 'Select Tone', description: 'Choose how you want to sound (e.g., Professional).' },
      { step: 3, title: 'Generate', description: 'Get a ready-to-send email in seconds.' },
    ],
    useCases: [
      { title: 'Cold Outreach', description: 'Write sales emails that actually get opened.' },
      { title: 'Customer Support', description: 'Respond to tickets with empathy and clarity.' },
      { title: 'Internal Updates', description: 'Send clear, concise updates to your team.' },
      { title: 'Job Applications', description: 'Craft the perfect cover letter or follow-up.' },
    ],
    relatedTools: [
      { id: 'grammar-checker', name: 'Grammar Checker', description: 'Fix grammar errors', category: 'Text AI' },
    ],
    faqs: [
      { id: 'faq1', question: 'Is it free?', answer: 'Yes, rewrite unlimited emails for free.' },
      { id: 'faq2', question: 'Is it secure?', answer: 'Your emails are processed securely and never stored.' },
      { id: 'faq3', question: 'Can it shorten emails?', answer: 'Yes, use the "Concise" mode to summarize long threads.' },
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
      { title: 'Semantic Grouping', description: 'AI understands intent to group related keywords together.' },
      { title: 'Topic Authority', description: 'Build topical authority by covering all angles of a subject.' },
      { title: 'Cannibalization Check', description: 'Identify duplicate keywords to avoid competing with yourself.' },
      { title: 'Export Ready', description: 'Copy clustered lists directly into Excel or Google Sheets.' },
    ],
    howTo: [
      { step: 1, title: 'Import List', description: 'Paste your raw list of keywords (one per line).' },
      { step: 2, title: 'Analyze', description: 'AI scans and groups them by search intent.' },
      { step: 3, title: 'Plan Content', description: 'Use each cluster to write a comprehensive article.' },
    ],
    useCases: [
      { title: 'Content Silos', description: 'Structure your website hierarchy logically.' },
      { title: 'PPC Ad Groups', description: 'Create highly relevant ad groups for better Quality Score.' },
      { title: 'Niche Research', description: 'Quickly understand the sub-topics of a new niche.' },
      { title: 'Competitor Analysis', description: 'Group competitor keywords to find content gaps.' },
    ],
    relatedTools: [
      { id: 'seo-generator', name: 'SEO Generator', description: 'Generate meta tags', category: 'Text AI' },
    ],
    faqs: [
      { id: 'keyword-clustering-faq1', question: 'Is it free?', answer: 'Yes, cluster keywords for free.' },
      { id: 'keyword-clustering-faq2', question: 'What is the limit?', answer: 'Process up to 500 keywords in a single batch.' },
      { id: 'keyword-clustering-faq3', question: 'Does it check search volume?', answer: 'Currently no, it focuses on semantic grouping only.' },
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
      { title: 'Instant Digest', description: 'Turn long documents into quick, readable summaries.' },
      { title: 'Bullet Points', description: 'Get the main ideas in a simple, list format.' },
      { title: 'Paragraph Mode', description: 'Generate cohesive, flowy abstracts.' },
      { title: 'Key Insight Extraction', description: 'Automatically highlights the most critical facts.' },
    ],
    howTo: [
      { step: 1, title: 'Input Text', description: 'Paste your text or upload a document.' },
      { step: 2, title: 'Choose Format', description: 'Select "Bullet Points" or "Paragraph".' },
      { step: 3, title: 'Summarize', description: 'Click to condense the information.' },
    ],
    useCases: [
      { title: 'Study Notes', description: 'Review chapters quickly before exams.' },
      { title: 'Meeting Minutes', description: 'Condense transcripts into actionable items.' },
      { title: 'News Reading', description: 'Get the gist of news stories in seconds.' },
      { title: 'Research', description: 'Scan abstracts to decide what to read fully.' },
    ],
    relatedTools: [
      { id: 'article-summarizer', name: 'Article Summarizer', description: 'Summarize articles', category: 'Text AI' },
    ],
    faqs: [
      { id: 'text-summarizer-faq1', question: 'Is it free?', answer: 'Yes, summarize unlimited text for free.' },
      { id: 'text-summarizer-faq2', question: 'What is the limit?', answer: 'Currently supports up to 5,000 words.' },
      { id: 'text-summarizer-faq3', question: 'Does it work on mobile?', answer: 'Yes, it is fully responsive for phone and tablet.' },
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
      { id: 'qr-code-generator-faq1', question: 'Does it expire?', answer: 'No, standard QR codes never expire.' },
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
      { id: 'file-converter-faq1', question: 'Are my files uploaded?', answer: 'No, all conversion happens locally in your browser.' },
      { id: 'file-converter-faq2', question: 'What formats are supported?', answer: 'Images (PNG/JPG/WEBP) and Text Data (JSON/CSV).' },
    ],
  },
};
