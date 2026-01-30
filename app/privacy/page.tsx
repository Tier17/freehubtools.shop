import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - FreeHubTools',
  description: 'Privacy Policy for FreeHubTools. Learn how we handle your data.',
  alternates: {
    canonical: 'https://freehubtools.shop/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-lg mb-4">
        Last updated: January 29, 2025
      </p>
      <div className="prose dark:prose-invert max-w-none">
        <p>
          At FreeHubTools, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
        </p>
        <h2>Information We Collect</h2>
        <p>
          We currently do not collect any personal data. All processing is done locally in your browser where possible.
        </p>
        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us.
        </p>
      </div>
    </div>
  );
}
