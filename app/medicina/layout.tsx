import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions()}
      tree={source.getPageTree()}
      links={[]}
      githubUrl="https://github.com/Uremy/taimilog"
      sidebar={{
        prefetch: false,
      }}
    >
      {children}
    </DocsLayout>
  );
}