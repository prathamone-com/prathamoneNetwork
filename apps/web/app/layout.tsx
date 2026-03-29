/**
 * ==========================================================
 * AITDL AI AGENT BUILD SIGNATURE
 * ==========================================================
 * Architect    : Jawahar R Mallah
 * Designation  : AI Systems Architect & Author
 * Organization : AITDL Network | PrathamOne
 * Framework    : Autonomous AI Agent Development
 * Authored By  : Jawahar R Mallah
 * Version      : 1.0.0
 * Release Date : 28 March 2026
 * Environment  : Production
 *
 * Signature    : Engineered by Jawahar R Mallah
 * Motto        : Crafted with Logic, Vision & AI
 * ==========================================================
 */
import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '../../../packages/ui/src/components/Navbar';
import { Footer } from '../../../packages/ui/src/components/Footer';

export const metadata: Metadata = {
  title: 'PrathamOne | AI Classroom for Bharat',
  description:
    'PrathamOne is an AI-powered education platform built for Bharat — delivering world-class learning in every language, in every village.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://prathamone.com'
  ),
  openGraph: {
    title: 'PrathamOne | AI Classroom for Bharat',
    description:
      'AI-powered education for every student in Bharat, even without internet.',
    url: 'https://prathamone.com',
    siteName: 'PrathamOne',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PrathamOne | AI Classroom for Bharat',
    description: 'AI-powered education for every student in Bharat.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=DM+Mono:wght@300;400;500&family=Noto+Sans+Devanagari:wght@300;400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="bg-glow" />
        <Navbar type="platform" userName="Jawahar R Mallah" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
