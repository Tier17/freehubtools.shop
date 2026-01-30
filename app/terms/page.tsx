import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - FreeHubTools',
  description: 'Terms of Service for FreeHubTools.',
  alternates: {
    canonical: 'https://freehubtools.shop/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="text-lg mb-4">
        Last updated: January 29, 2025
      </p>
      <div className="prose dark:prose-invert max-w-none">
        <p>
          By accessing and using FreeHubTools, you accept and agree to be bound by the terms and provision of this agreement.
        </p>
        <h2>Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the materials (information or software) on FreeHubTools' website for personal, non-commercial transitory viewing only.
        </p>
        <h2>Disclaimer</h2>
        <p>
          The materials on FreeHubTools' website are provided on an 'as is' basis. FreeHubTools makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>
      </div>
    </div>
  );
}
