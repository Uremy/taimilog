import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions()} // 1. Trae todo (título, colores, etc.)
      tree={source.getPageTree()}
      links={[]} // 2. [!IMPORTANTE] Aquí forzamos que la lista de links esté vacía
    >
      {children}
    </DocsLayout>
  );
}