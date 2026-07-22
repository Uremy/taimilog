// components/PageFooter.tsx
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type * as PageTree from 'fumadocs-core/page-tree';

type Item = Pick<PageTree.Item, 'name' | 'description' | 'url'>;

interface PageFooterProps {
  url: string;
  pageTree: PageTree.Root;
}

// 👇 1. NUEVO: Un radar que busca si una carpeta contiene nuestra página actual
function containsUrl(folder: PageTree.Folder, targetUrl: string): boolean {
  if (folder.index?.url === targetUrl) return true;
  return folder.children.some((child) => {
    if (child.type === 'page') return child.url === targetUrl;
    if (child.type === 'folder') return containsUrl(child, targetUrl);
    return false;
  });
}

function getFlatPages(nodes: PageTree.Node[]): Item[] {
  const result: Item[] = [];

  for (const node of nodes) {
    if (node.type === 'page') {
      result.push({ name: node.name, description: node.description, url: node.url });
    } else if (node.type === 'folder') {
      if (node.index) {
        result.push({ name: node.index.name, description: node.index.description, url: node.index.url });
      }
      result.push(...getFlatPages(node.children));
    }
  }
  return result;
}

export function PageFooter({ url, pageTree }: PageFooterProps) {
  // 👇 2. MAGIA: Empezamos asumiendo todo el árbol
  let scopedNodes = pageTree.children;

  // 👇 3. Buscamos el Semestre (o carpeta principal) activo
  for (const node of pageTree.children) {
    if (node.type === 'folder' && containsUrl(node, url)) {
      // ¡Lo encontramos! Aislamos la navegación ÚNICAMENTE a esta carpeta
      scopedNodes = [node];
      break;
    }
  }

  // 👇 4. Aplanamos solo la carpeta aislada, garantizando que no se crucen semestres
  const allPages = getFlatPages(scopedNodes);

  const currentIndex = allPages.findIndex((page) => page.url === url);

  if (currentIndex === -1) return null;

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