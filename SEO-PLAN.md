# FreeHubTools.shop - SEO + App Plan

This file captures the SEO and app-structure guidance for FreeHubTools.shop.
Focus: organic search traffic and clear site architecture (no tech stack details).

## Goals
- Rank for high-intent keywords with clean, descriptive URLs
- Build topical authority per category
- Drive repeat visits with strong internal linking and UX

## Site Architecture
- Category hubs:
  - /text-ai/
  - /image-ai/
  - /audio-ai/
  - /productivity/
- Tool pages:
  - /category/tool-name/
  - Example: /text-ai/article-summarizer/
- Breadcrumbs on every page:
  - Home > Category > Tool

## MVP Scope (SEO-first)
- Launch with fewer tools (6-10) so category hubs and cross-links are strong.
- Expand category by category to grow topical authority.

## SEO Page Types
- Category landing pages (optimized, not just lists)
- Tool pages (primary ranking pages)
- Supporting content:
  - How-to guides
  - Templates
  - Comparisons
  - Use-case pages (e.g., "Summarize articles for students")
- Glossary pages for long-tail keywords
- "Best free tools" hub page to funnel traffic

## On-Page SEO Standards
- Unique title and meta for every tool page
- Headings:
  - H1: tool name
  - H2: instructions, features, use cases
  - H3: examples, related tools, FAQs
- Clear internal linking:
  - Tool -> related tools (4-6 links)
  - Tool -> category hub
  - Category -> top tools
  - Guide -> tool + category
- Image SEO:
  - Descriptive file names
  - Alt text with keywords
  - Image sitemap

## Schema Targets
- SoftwareApplication (tool pages)
- FAQPage (FAQs)
- HowTo (guides)
- BreadcrumbList (all pages)

## CTR and SERP Strategy
- Title templates tailored per tool type
- Meta descriptions with strong value proposition
- "Why this tool" section near top of each tool page

## Content Strategy
- Build topical clusters per category:
  - Category hub -> tools -> guides -> glossary
- Publish supporting content on a regular cadence
- Add changelog/update notes for freshness signals

## Internal Linking Rules
- Each tool page links to:
  - Category hub
  - 4-6 related tools
  - 1-2 guides or templates
- Each category page links to:
  - Top tools
  - Latest tools
  - Guides
- Each guide links back to:
  - Relevant tool page
  - Category hub

## Indexing and Canonicals
- Noindex any duplicate or thin pages
- Use canonical tags for duplicate content or parameterized URLs
- Maintain a clean sitemap that only includes index-worthy pages

## Crawlability Checklist
- robots.txt allows all public sections and points to sitemap
- XML sitemap split by type (categories, tools, guides) and kept fresh
- HTML sitemap page linked in footer
- Consistent URL rules (trailing slash or not, choose one)
- 301 redirects for URL changes; avoid 4xx on public pages
- Avoid infinite crawl spaces (filters, search pages) or noindex them

## AI Crawler Access Policy
- Goal: allow reputable AI crawlers to index public pages for visibility in AI answers.
- This does not directly improve Google rankings, but can increase brand exposure.
- Default policy: allow AI crawlers for public pages; block admin, auth, and private areas.
- Watch for content scraping and duplicates; adjust policy if abuse is detected.

## UX Elements That Support SEO
- Fast tool usage flow with minimal friction
- Clear instructions and examples above the fold
- Visible content (avoid hiding critical text in tabs/modals)
- Search and filters for tool discovery

## Trust + Safety
- Clear tool descriptions and privacy statements
- Disclaimers for any downloader tools
- Contact and feedback options

## Monetization (SEO-safe)
- Avoid heavy ads early (protect Core Web Vitals)
- Add ads after stable traffic and strong UX
- Freemium gating only where it does not block indexing

## Tools List

### Text / AI
- Article Summarizer -> /text-ai/article-summarizer/
- Paraphraser -> /text-ai/paraphraser/
- Grammar Checker -> /text-ai/grammar-checker/
- Email Generator -> /text-ai/email-generator/
- AI Content Generator -> /text-ai/ai-content-generator/
- AI Resume Builder -> /text-ai/ai-resume-builder/

### Image
- Background Remover -> /image-ai/background-remover/
- Meme Maker -> /image-ai/meme-maker/
- Image Resizer -> /image-ai/image-resizer/
- AI Image Generator -> /image-ai/ai-image-generator/
- Image Upscaler -> /image-ai/image-upscaler/
- Color Palette Generator -> /image-ai/color-palette-generator/

### Audio
- Text-to-Speech -> /audio-ai/text-to-speech/
- Voice Changer -> /audio-ai/voice-changer/
- Audio Converter -> /audio-ai/audio-converter/
- Audio Transcriber -> /audio-ai/audio-transcriber/

### Video / Downloaders
- YouTube Downloader -> /video-ai/youtube-downloader/
- TikTok Downloader -> /video-ai/tiktok-downloader/
- Instagram Downloader -> /video-ai/instagram-downloader/
- PDF to Word Converter -> /video-ai/pdf-to-word/
- Word to PDF Converter -> /video-ai/word-to-pdf/
- Video to GIF -> /video-ai/video-to-gif/

### Productivity / Utilities
- Password Generator -> /productivity/password-generator/
- QR Code Generator -> /productivity/qr-code-generator/
- Unit Converter -> /productivity/unit-converter/
- Loan / EMI Calculator -> /productivity/loan-calculator/
- AI Code Helper -> /productivity/ai-code-helper/
- Task / To-Do Manager -> /productivity/task-manager/
- Random Name Generator -> /productivity/random-name-generator/
- File Compression Tool -> /productivity/file-compressor/
