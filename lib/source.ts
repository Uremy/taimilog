// Importamos las dos colecciones que definimos
import { medicina, biblioteca } from 'fumadocs-mdx:collections/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';

// 1. Fuente para MEDICINA
export const source = loader({
  baseUrl: '/medicina',
  source: medicina.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

// 2. Fuente para BIBLIOTECA
export const sourceBiblioteca = loader({
  baseUrl: '/biblioteca',
  source: biblioteca.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

// 3. Helper para imágenes OG - Medicina
export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];
  return {
    segments,
    url: `/og/medicina/${segments.join('/')}`,
  };
}

// 👇 4. NUEVO: Helper para imágenes OG - Biblioteca
export function getBibliotecaPageImage(page: InferPageType<typeof sourceBiblioteca>) {
  const segments = [...page.slugs, 'image.png'];
  return {
    segments,
    url: `/og/biblioteca/${segments.join('/')}`,
  };
}

// 5. Helper para texto LLM
export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');
  return `# ${page.data.title}

${processed}`;
}