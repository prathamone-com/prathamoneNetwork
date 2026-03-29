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
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://prathamone.com';
  return [
    { url: `${base}/`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 1 },
    { url: `${base}/about`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/student/classroom`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  ];
}

