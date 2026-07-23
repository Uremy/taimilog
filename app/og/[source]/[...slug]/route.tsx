import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { source, sourceBiblioteca, getPageImage, getBibliotecaPageImage } from '@/lib/source';
import { generate } from '@/lib/og/image';
import { getOgFonts } from '@/lib/og/fonts';
import { OG_SOURCES, type OgSourceKey } from '@/lib/og/sources';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ source: string; slug: string[] }> }
) {
  const { source: rawSource, slug } = await params;

  // 1. Blindaje: Validamos que sea 'medicina', 'biblioteca' o 'homepage'
  if (!(rawSource in OG_SOURCES)) {
    notFound();
  }
  const sourceKey = rawSource as OgSourceKey;

  // 2. Lógica de enrutamiento por colección:
  // Le quitamos 'image.png' al final del slug para buscar en Fumadocs
  const cleanSlug = slug.slice(0, -1);
  let pageData: { title: string; description?: string } | undefined;

  if (sourceKey === 'medicina') {
    const page = source.getPage(cleanSlug);
    if (page) pageData = page.data;
  } else if (sourceKey === 'biblioteca') {
    const page = sourceBiblioteca.getPage(cleanSlug);
    if (page) pageData = page.data;
  } else if (sourceKey === 'homepage') {
    // Si en algún momento pasas una ruta para homepage, puedes definirla aquí
    pageData = {
      title: 'Taimilog',
      description: 'Apuntes de medicina y jardín digital',
    };
  }

  // Si después de buscar no encontramos la página en su colección, devolvemos 404
  if (!pageData) notFound();

  // 3. Cargamos las fuentes desde la caché en memoria
  const fonts = await getOgFonts();

  // 4. Generamos y devolvemos la imagen estática
  return new ImageResponse(
    generate({
      source: sourceKey,
      title: pageData.title,
      description: pageData.description,
    }),
    { width: 1200, height: 630, fonts }
  );
}

// 5. Pre-renderizado estático: Unimos las páginas de medicina y de biblioteca en el build
export function generateStaticParams() {
  const medicinaParams = source.getPages().map((page) => ({
    source: 'medicina',
    slug: getPageImage(page).segments,
  }));

  const bibliotecaParams = sourceBiblioteca.getPages().map((page) => ({
    source: 'biblioteca',
    slug: getBibliotecaPageImage(page).segments,
  }));

  // Devolvemos el array combinado para que Next.js compile todas en 'next build'
  return [...medicinaParams, ...bibliotecaParams];
}