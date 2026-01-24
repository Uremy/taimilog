// Importamos las dos colecciones que definimos
import { medicina, biblioteca } from 'fumadocs-mdx:collections/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';

// 1. Fuente para MEDICINA (Mantenemos el nombre 'source' para no romper tu layout actual)
// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: '/medicina',
  source: medicina.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

// Fuente Biblioteca (Blog + Escritos + Bookmarks)
export const sourceBiblioteca = loader({
  baseUrl: '/biblioteca',
  source: biblioteca.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

// Helper para imágenes (Medicina)
export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];
  return {
    segments,
    url: `/og/medicina/${segments.join('/')}`,
  };
}

// Helper para texto LLM
export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');
  return `# ${page.data.title}

${processed}`;
}
