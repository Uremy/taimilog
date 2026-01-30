import { source, sourceBiblioteca } from '@/lib/source';
import { createSearchAPI } from 'fumadocs-core/search/server';

export const { GET } = createSearchAPI('advanced', {
  language: 'english', // Mantuvimos inglés por mejor rendimiento
  
  search: {
    threshold: 0.8,
    tolerance: 1,
  },
  
  indexes: [
    // 1. MEDICINA (Fuente principal)
    ...source.getPages().map((page) => ({
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      id: page.url,
      structuredData: page.data.structuredData,
      tag: 'Medicina',
    })),

    // 2. BIBLIOTECA y sus derivados (Blog, Escritos, etc.)
    ...sourceBiblioteca.getPages().map((page) => {
      // 👇 Lógica de etiquetado automático según la URL
      let tag = 'Biblioteca'; // Valor por defecto
      
      if (page.url.includes('/blog')) tag = 'Blog';
      else if (page.url.includes('/escritos')) tag = 'Escritos';
      else if (page.url.includes('/bookmarks')) tag = 'Bookmarks';
      
      return {
        title: page.data.title,
        description: page.data.description,
        url: page.url,
        id: page.url,
        structuredData: page.data.structuredData,
        tag: tag, // Asignamos la etiqueta calculada
      };
    }),
  ],
});