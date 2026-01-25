import { sourceBiblioteca } from '@/lib/source';
import { DocsPage, DocsBody, DocsDescription, DocsTitle, PageLastUpdate } from 'fumadocs-ui/layouts/notebook/page';
import { notFound, redirect } from 'next/navigation'; // <--- 1. Agregamos 'redirect'
import { getMDXComponents } from '@/mdx-components';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;

  // --- 2. LA CORRECCIÓN: Lógica de Portero Integrada ---
  // Si no hay "slug" (significa que el usuario está en /biblioteca),
  // lo empujamos inmediatamente al blog.
  if (!params.slug) {
    redirect('/biblioteca/blog');
  }
  // -----------------------------------------------------

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

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const params = await props.params;
  const page = sourceBiblioteca.getPage(params.slug);
  
  // Pequeña protección para metadata también
  if (!page) return {}; 

  return {
    title: page.data.title,
    description: page.data.description,
  };
}