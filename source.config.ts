import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from 'fumadocs-mdx/config';
import { z } from 'zod'; // <--- 1. Importamos Zod para poder editar esquemas

// 1. Medicina
export const medicina = defineDocs({
  dir: 'content/medicina',
  docs: {
    // 2. Extendemos el esquema por defecto
    // Esto dice: "Usa todo lo normal (título, descripción...) Y ADEMÁS permite lastModified"
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

// 2. Biblioteca
export const biblioteca = defineDocs({
  dir: 'content/biblioteca',
  docs: {
    // 3. Aplicamos la misma extensión aquí (donde tenías el error)
    schema: frontmatterSchema.extend({
      lastModified: z.string().or(z.date()).optional(),
    }),
    postprocess: { includeProcessedMarkdown: true },
  },
  meta: { schema: metaSchema },
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});