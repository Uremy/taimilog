// components/PageFooter.tsx
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type * as PageTree from 'fumadocs-core/page-tree';

type Item = Pick<PageTree.Item, 'name' | 'description' | 'url'>;

interface PageFooterProps {
  url: string;
  pageTree: PageTree.Root;
}

// 👇 1. Creamos una función infalible que aplana el árbol en un orden de lectura lineal
function getFlatPages(nodes: PageTree.Node[]): Item[] {
  const result: Item[] = [];

  for (const node of nodes) {
    if (node.type === 'page') {
      result.push({ name: node.name, description: node.description, url: node.url });
    } else if (node.type === 'folder') {
      // Si la carpeta funciona como una página principal (tiene index), la añadimos
      if (node.index) {
        result.push({ name: node.index.name, description: node.index.description, url: node.index.url });
      }
      // Entramos a la carpeta y extraemos sus hijos en orden
      result.push(...getFlatPages(node.children));
    }
  }
  return result;
}

export function PageFooter({ url, pageTree }: PageFooterProps) {
  // 👇 2. Obtenemos el "libro completo" de la sección (Biblioteca o Medicina)
  const allPages = getFlatPages(pageTree.children);

  // 👇 3. Buscamos en qué número de página estamos
  const currentIndex = allPages.findIndex((page) => page.url === url);

  // Protección: Si por algo no estamos en el árbol, no mostramos nada
  if (currentIndex === -1) return null;

  // 👇 4. Matemáticas puras de Fumadocs: anterior y siguiente
  const previous = currentIndex > 0 ? allPages[currentIndex - 1] : undefined;
  const next = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : undefined;

  if (!previous && !next) return null;

  return (
    <div
      className={`@container grid gap-4 mt-12 pt-6 border-t border-fd-border ${
        previous && next ? 'grid-cols-2' : 'grid-cols-1'
      }`}
    >
      {previous && <FooterItem item={previous} index={0} />}
      {next && <FooterItem item={next} index={1} />}
    </div>
  );
}

function FooterItem({ item, index }: { item: Item; index: 0 | 1 }) {
  const Icon = index === 0 ? ChevronLeft : ChevronRight;

  return (
    <Link
      href={item.url}
      className={`flex flex-col gap-2 rounded-lg border border-fd-border bg-fd-card p-4 text-sm transition-colors hover:bg-fd-accent/80 hover:text-fd-accent-foreground @max-lg:col-span-full ${
        index === 1 ? 'text-end' : ''
      }`}
    >
      <div
        className={`inline-flex items-center gap-1.5 font-medium text-fd-foreground ${
          index === 1 ? 'flex-row-reverse' : ''
        }`}
      >
        <Icon className="-mx-1 size-4 shrink-0 rtl:rotate-180" />
        <p>{item.name}</p>
      </div>

      <p className="text-fd-muted-foreground truncate">
        {item.description ?? (index === 0 ? 'Anterior' : 'Siguiente')}
      </p>
    </Link>
  );
}