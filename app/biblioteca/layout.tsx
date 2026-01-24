import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { baseOptions } from '@/lib/layout.shared';
import { sourceBiblioteca } from '@/lib/source'; // <--- Usamos la nueva fuente
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  // Extraemos nav para preservar tu logo
  const { nav: baseNav, ...baseRest } = baseOptions();

  return (
    <DocsLayout
      tree={sourceBiblioteca.getPageTree()}
      {...baseRest}
      
      // 1. Configuración de Navegación (Logo + Transparencia)
      nav={{
        ...baseNav,
        transparentMode: 'top',
        // mode: 'top' // Puedes descomentar esto si quieres que la barra se vea separada del contenido
      }}

      // 2. LA MAGIA: Pestañas en la barra superior
      // Esto tomará las carpetas 'blog', 'escritos', 'bookmarks' y las pondrá arriba
      tabMode="navbar"
    >
      {children}
    </DocsLayout>
  );
}