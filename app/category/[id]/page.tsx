import { CategoryClient } from './category-client';
import { notFound } from 'next/navigation';
import CategoryBreadcrumb from './category-breadcrumb';
import CategoryHeader from './category-header';
import CategoryToolsGrid from './category-tools-grid';
import RelatedCategories from './related-categories';
import CategoryFAQ from './category-faq';
import { categoryData } from '@/lib/categories-data';

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
    alternates: {
      canonical: `https://www.freehubtools.shop/category/${id}`,
    },
    openGraph: {
      title: `${category.name} - FreeHubTools`,
      description: category.description,
      type: 'website',
      url: `https://www.freehubtools.shop/category/${id}`,
      images: [
        {
          url: '/og-image.png', // Using global OG image for categories for now, or could use specific if available
          width: 1200,
          height: 630,
          alt: category.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} - FreeHubTools`,
      description: category.description,
      images: ['/og-image.png'],
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = categoryData[id];

  if (!category) {
    notFound();
  }

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description,
    url: `https://www.freehubtools.shop/category/${id}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: category.tools.map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://www.freehubtools.shop/tool/${tool.id}`,
        name: tool.name,
        description: tool.description,
      })),
    },
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
        name: category.name,
        item: `https://www.freehubtools.shop/category/${id}`,
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: category.faqs.map(faq => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CategoryClient category={category} />
    </>
  );
}
