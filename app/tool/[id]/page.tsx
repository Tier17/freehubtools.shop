import { ToolClient } from './tool-client';
import { notFound } from 'next/navigation';
import { toolData } from '@/lib/tools-data';

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
    alternates: {
      canonical: `https://www.freehubtools.shop/tool/${id}`,
    },
    openGraph: {
      title: tool.name,
      description: tool.description,
      type: 'website',
      url: `https://www.freehubtools.shop/tool/${id}`,
      images: [
        {
          url: `/og/${id}.png`, // Dynamic OG image per tool
          width: 1200,
          height: 630,
          alt: tool.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.name,
      description: tool.description,
      images: [`/og/${id}.png`],
    },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tool = toolData[id];

  if (!tool) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    image: tool.imageUrl,
    applicationCategory: tool.category,
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: tool.features.map(f => f.title).join(', '),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.freehubtools.shop',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: tool.category,
        item: `https://www.freehubtools.shop/category/${tool.categoryId}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.name,
        item: `https://www.freehubtools.shop/tool/${id}`,
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ToolClient tool={tool} />
    </>
  );
}
