// components/PageFooter.tsx
import { getPageTreePeers } from 'fumadocs-core/page-tree';
import { sourceBiblioteca } from '@/lib/source';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

type Item = { name: string; description?: string; url: string };

export function PageFooter({ url }: { url: string }) {
  // ✅ LA MAGIA REAL: Fumadocs devuelve exactamente [anterior, siguiente]
  const [previous, next] = getPageTreePeers(sourceBiblioteca.pageTree, url);

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