import { source, sourceBiblioteca } from '@/lib/source';
import { createSearchAPI } from 'fumadocs-core/search/server';

export const { GET } = createSearchAPI('advanced', {
  // 👇 CAMBIO IMPORTANTE: Usar 'spanish' para mejorar la precisión
  language: 'english', 
  
  search: {
    threshold: 0.8,
    tolerance: 1,
  },
  
  indexes: [
    ...source.getPages().map((page) => ({
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      id: page.url,
      structuredData: page.data.structuredData,
      // 🏷️ Etiqueta 1: Medicina (Mayúscula, importante recordar esto para el paso 2)
      tag: 'Medicina',
    })),

    ...sourceBiblioteca.getPages().map((page) => ({
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      id: page.url,
      structuredData: page.data.structuredData,
      // 🏷️ Etiqueta 2: Biblioteca
      tag: 'Biblioteca',
    })),
  ],
});