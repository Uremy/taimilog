import { Card, Cards } from 'fumadocs-ui/components/card';
import { sourceBiblioteca } from '@/lib/source';
import { useMemo } from 'react';

interface PostGridProps {
  path: string; // Ej: "biblioteca/blog"
}

export function PostGrid({ path }: PostGridProps) {
  // Obtenemos las páginas filtradas
  const posts = useMemo(() => {
    return sourceBiblioteca.getPages()
      .filter((page) => 
        // Que esté dentro de la carpeta indicada
        page.url.startsWith(`/${path}/`) && 
        // Que no sea el índice mismo
        page.url !== `/${path}`
      )
      // Opcional: Ordenar por fecha (si usas frontmatter date)
      // .sort((a, b) => {
      //    if (!a.data.date || !b.data.date) return 0;
      //    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
      // })
      ;
  }, [path]);

  if (posts.length === 0) {
    return (
        <div className="p-4 border border-dashed rounded-lg text-fd-muted-foreground text-sm text-center">
            No hay entradas publicadas aún en esta sección.
        </div>
    );
  }

  return (
    <Cards>
      {posts.map((post) => (
        <Card
          key={post.url}
          href={post.url}
          title={post.data.title}
          description={post.data.description}
          // Si tienes iconos definidos en el frontmatter, podrías usarlos aquí,
          // pero requeriría importar iconos dinámicamente o mapearlos.
        />
      ))}
    </Cards>
  );
}