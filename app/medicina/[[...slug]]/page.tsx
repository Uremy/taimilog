import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  PageLastUpdate,
} from 'fumadocs-ui/layouts/docs/page';
import { createRelativeLink } from 'fumadocs-ui/mdx';

import Comments from '@/components/Comments';
import { PageFooter } from '@/components/PageFooter';
import { LLMCopyButton, ViewOptions } from '@/components/ai/page-actions';
import { Mermaid } from '@/components/mdx/mermaid';
import { getPageImage, source } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';

export default async function Page(props: PageProps<'/medicina/[[...slug]]'>) {
  const params = await props.params;

  if (!params.slug || params.slug.length === 0) {
    redirect('/medicina/introduccion');
  }

  const page = source.getPage(params.slug);
  if (!page) notFound();

  const lastModifiedTime = page.data.lastModified;
  const MDX = page.data.body;

  const gitConfig = {
    user: 'Uremy',
    repo: 'taimilog',
    branch: 'main',
  };

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      footer={{ enabled: false }}
      tableOfContent={{ style: 'clerk' }}
      tableOfContentPopover={{ style: 'clerk' }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>

      {lastModifiedTime && <PageLastUpdate date={lastModifiedTime} />}

      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
        <ViewOptions
          markdownUrl={`${page.url}.mdx`}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/medicina/${page.path}`}
        />
      </div>

      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
            Mermaid,
          })}
        />
      </DocsBody>

      <PageFooter url={page.url} pageTree={source.pageTree} />
      <Comments />
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<'/medicina/[[...slug]]'>
): Promise<Metadata> {
  const params = await props.params;

  if (!params.slug || params.slug.length === 0) {
    return {
      title: 'Medicina',
      description: 'Apuntes de medicina organizados',
    };
  }

  const page = source.getPage(params.slug);
  if (!page) notFound();

  const imageUrl = getPageImage(page).url;

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