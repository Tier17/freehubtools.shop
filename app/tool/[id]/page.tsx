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
      canonical: `https://freehubtools.shop/tool/${id}`,
    },
    openGraph: {
      title: tool.name,
      description: tool.description,
      type: 'website',
      url: `https://freehubtools.shop/tool/${id}`,
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
    applicationCategory: tool.category,
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: tool.features.map(f => f.title).join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolClient tool={tool} />
    </>
  );
}
