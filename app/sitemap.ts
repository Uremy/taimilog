// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { source, sourceBiblioteca } from '@/lib/source';
import { SITE_URL } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  // --- Páginas de Medicina ---
  const medicinaPages: MetadataRoute.Sitemap = source.getPages().map((page) => ({
    url: `${SITE_URL}${page.url}`,
    lastModified: page.data.lastModified
      ? new Date(page.data.lastModified)
      : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // --- Páginas de Biblioteca (blog, bookmarks, escritos) ---
  const bibliotecaPages: MetadataRoute.Sitemap = sourceBiblioteca
    .getPages()
    .map((page) => ({
      url: `${SITE_URL}${page.url}`,
      lastModified: page.data.lastModified
        ? new Date(page.data.lastModified)
        : new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

  // --- Páginas estáticas clave ---
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  return [...staticPages, ...medicinaPages, ...bibliotecaPages];
}