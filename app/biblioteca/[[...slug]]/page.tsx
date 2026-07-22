import { sourceBiblioteca, getBibliotecaPageImage } from '@/lib/source';
import { DocsPage, DocsBody, DocsDescription, DocsTitle, PageLastUpdate } from 'fumadocs-ui/layouts/notebook/page';
import { notFound, redirect } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import Comments from '@/components/Comments';
import { PageFooter } from '@/components/PageFooter';

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;

  if (!params.slug) {
    redirect('/biblioteca/blog');
  }

  const page = sourceBiblioteca.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const lastModified = page.data.lastModified ? new Date(page.data.lastModified) : undefined;

  // Lista de rutas exactas donde los comentarios estaran deshabilitados
  const disabledCommentsUrls = [
    '/biblioteca/blog',
    '/biblioteca/escritos',
    '/biblioteca/bookmarks'
  ];

  // Verifica si la URL actual NO esta en la lista negra (coincidencia exacta, no hereda a subrutas)
  const showComments = !disabledCommentsUrls.includes(page.url);

  return (
    <DocsPage 
      toc={page.data.toc} 
      full={page.data.full}
      tableOfContent={{ style: 'clerk', enabled: true }}
      footer={{ enabled: false }} // Mantenemos apagado el footer automatico de Fumadocs
      breadcrumb={{ enabled: true }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents({
           a: createRelativeLink(sourceBiblioteca, page),
        })} />
        {lastModified && (
           <div className="mt-8 text-sm text-muted-foreground">
             <PageLastUpdate date={lastModified} />
           </div>
        )}
      </DocsBody>

      {/* Navegacion manual infalible (Sin dependencias ocultas del CLI) */}
      <PageFooter url={page.url} pageTree={sourceBiblioteca.pageTree} />

      {/* Comentarios de Giscus renderizados condicionalmente */}
      {showComments && <Comments />}
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return sourceBiblioteca.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const params = await props.params;
  
  if (!params.slug) {
    return {
      title: 'Biblioteca',
      description: 'Blog personal y reflexiones filosóficas',
    };
  }

  const page = sourceBiblioteca.getPage(params.slug);
  if (!page) return {};

  const imageUrl = getBibliotecaPageImage(page).url;

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      images: imageUrl,
      siteName: 'Taimilog',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      images: imageUrl,
    },
  };
}