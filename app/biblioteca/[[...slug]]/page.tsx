import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  PageLastUpdate,
} from 'fumadocs-ui/layouts/notebook/page';
import { createRelativeLink } from 'fumadocs-ui/mdx';

import Comments from '@/components/Comments';
import { PageFooter } from '@/components/PageFooter';
import { Mermaid } from '@/components/mdx/mermaid';
import { getBibliotecaPageImage, sourceBiblioteca } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;

  if (!params.slug) {
    redirect('/biblioteca/blog');
  }

  const page = sourceBiblioteca.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const lastModified = page.data.lastModified ? new Date(page.data.lastModified) : undefined;

  // Rutas sin sección de comentarios
  const disabledCommentsUrls = [
    '/biblioteca/blog',
    '/biblioteca/escritos',
    '/biblioteca/bookmarks',
  ];

  const showComments = !disabledCommentsUrls.includes(page.url);

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{ style: 'clerk', enabled: true }}
      footer={{ enabled: false }}
      breadcrumb={{ enabled: true }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>

      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(sourceBiblioteca, page),
            Mermaid,
          })}
        />
        {lastModified && (
          <div className="mt-8 text-sm text-muted-foreground">
            <PageLastUpdate date={lastModified} />
          </div>
        )}
      </DocsBody>

      <PageFooter url={page.url} pageTree={sourceBiblioteca.pageTree} />
      {showComments && <Comments />}
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return sourceBiblioteca.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
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