import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from 'fumadocs-mdx/config';

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const medicina = defineDocs({
  dir: 'content/medicina',
  docs: {
    schema: frontmatterSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// 2. Biblioteca (Nueva definición unificada)
export const biblioteca = defineDocs({
  dir: 'content/biblioteca', // <--- Apunta a la nueva carpeta padre
  docs: {
    schema: frontmatterSchema,
    postprocess: { includeProcessedMarkdown: true },
  },
  meta: { schema: metaSchema },
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
