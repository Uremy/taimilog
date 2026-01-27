import { source, sourceBiblioteca } from '@/lib/source';
import { createSearchAPI } from 'fumadocs-core/search/server';

export const { GET } = createSearchAPI('advanced', {
  language: 'english',
  
  // 👇 NUEVO: Configuración de sensibilidad de búsqueda
  search: {
    threshold: 0.8,  // 0-1: Qué tan similar debe ser (0.8 = 80% de coincidencia)
    tolerance: 1,    // Permite 1 error tipográfico (ejm: "mediicna" encontrará "medicina")
  },
  
  indexes: [
    ...source.getPages().map((page) => ({
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      id: page.url,
      structuredData: page.data.structuredData,
      tag: 'Medicina',
    })),

    ...sourceBiblioteca.getPages().map((page) => ({
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      id: page.url,
      structuredData: page.data.structuredData,
      tag: 'Biblioteca',
    })),
  ],
});