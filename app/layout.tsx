import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.freehubtools.shop'),
  title: 'FreeHubTools - Free AI & Utility Tools Hub',
  description: 'Discover AI-powered and utility tools you can use daily. Text AI, Image AI, Audio AI, Video AI, and Productivity tools all in one place.',
  openGraph: {
    title: 'FreeHubTools - Free Hub of Online Tools',
    description: 'AI-powered and utility tools you can use daily',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FreeHubTools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreeHubTools - Free Hub of Online Tools',
    description: 'AI-powered and utility tools you can use daily',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-N8R9PBPP30" 
          strategy="afterInteractive" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-N8R9PBPP30');
          `}
        </Script>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
