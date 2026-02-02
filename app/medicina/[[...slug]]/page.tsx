import { getPageImage, source } from '@/lib/source';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { notFound, redirect } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { LLMCopyButton, ViewOptions } from '@/components/ai/page-actions';

export default async function Page(props: PageProps<'/medicina/[[...slug]]'>) {
  const params = await props.params;

  // Redirect a introducción si no hay slug
  if (!params.slug || params.slug.length === 0) {
    redirect('/medicina/introduccion');
  }

  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const gitConfig = {
    user: 'username',
    repo: 'repo',
    branch: 'main',
  };

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
        <ViewOptions
          markdownUrl={`${page.url}.mdx`}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/docs/content/docs/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

// 👇 ACTUALIZADO: Metadata completa con OG Image
export async function generateMetadata(props: PageProps<'/medicina/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  
  // Protección: si no hay slug, retorna metadata básica
  if (!params.slug || params.slug.length === 0) {
    return {
      title: 'Medicina',
      description: 'Apuntes de medicina organizados',
    };
  }

  const page = source.getPage(params.slug);
  if (!page) notFound();

  // Generar URL de la imagen OG
  const imageUrl = getPageImage(page).url;

  return {
    title: page.data.title,
    description: page.data.description,
    
    // 👇 Open Graph completo (Facebook, LinkedIn, Discord)
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