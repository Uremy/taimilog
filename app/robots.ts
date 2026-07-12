// app/robots.ts
import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /api/ no aporta valor de indexación y evita gastar crawl budget.
      // /og/ son solo endpoints generadores de imagen, no páginas.
      disallow: ['/api/', '/og/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}