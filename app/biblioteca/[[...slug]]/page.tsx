import { sourceBiblioteca, getBibliotecaPageImage } from '@/lib/source'; // 👈 Importamos helper
import { DocsPage, DocsBody, DocsDescription, DocsTitle, PageLastUpdate } from 'fumadocs-ui/layouts/notebook/page';
import { notFound, redirect } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;

  // Redirect a blog si no hay slug
  if (!params.slug) {
    redirect('/biblioteca/blog');
  }

  const page = sourceBiblioteca.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const lastModified = page.data.lastModified ? new Date(page.data.lastModified) : undefined;

  return (
    <DocsPage 
      toc={page.data.toc} 
      full={page.data.full}
      tableOfContent={{ style: 'clerk', enabled: true }}
      footer={{ enabled: true }}
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
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return sourceBiblioteca.generateParams();
}

// 👇 ACTUALIZADO: Metadata con OG Image
export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const params = await props.params;
  
  // Protección: si no hay slug, retorna metadata básica
  if (!params.slug) {
    return {
      title: 'Biblioteca',
      description: 'Blog personal y reflexiones filosóficas',
    };
  }

  const page = sourceBiblioteca.getPage(params.slug);
  
  if (!page) return {};

  // 👇 Generar URL de la imagen OG
  const imageUrl = getBibliotecaPageImage(page).url;

  return {
    title: page.data.title,
    description: page.data.description,
    
    // 👇 Open Graph (Facebook, LinkedIn, Discord)
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      images: imageUrl,
      siteName: 'Taimilog',
      type: 'article',
    },
    
    // 👇 Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      images: imageUrl,
    },
  };
}