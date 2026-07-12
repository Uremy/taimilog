import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from 'fumadocs-mdx/config';
import { z } from 'zod';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import lastModified from 'fumadocs-mdx/plugins/last-modified';
import { remarkMdxMermaid } from 'fumadocs-core/mdx-plugins';

export const medicina = defineDocs({
  dir: 'content/medicina',
  docs: {
    schema: frontmatterSchema.extend({
      lastModified: z.string().or(z.date()).optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export const biblioteca = defineDocs({
  dir: 'content/biblioteca',
  docs: {
    schema: frontmatterSchema.extend({
      lastModified: z.string().or(z.date()).optional(),
    }),
    postprocess: { includeProcessedMarkdown: true },
  },
  meta: { schema: metaSchema },
});

export default defineConfig({
  plugins: [lastModified()],
  mdxOptions: {
    // 2. Agregamos remarkMdxMermaid a la lista de plugins
    remarkPlugins: [remarkMath, remarkMdxMermaid],
    
    rehypePlugins: (v) => [rehypeKatex, ...v],
  },
});