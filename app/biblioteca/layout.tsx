import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { baseOptions } from '@/lib/layout.shared';
import { sourceBiblioteca } from '@/lib/source'; // <--- Importante: Usamos tu fuente
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  // 1. Extraemos 'nav' y lo renombramos a 'baseNav'
  const { nav: baseNav, ...baseRest } = baseOptions();

  return (
    <DocsLayout
      {...baseRest}
      
      // 2. CORRECCIÓN: Usamos 'baseNav' (el nombre nuevo)
      nav={{ 
        ...baseNav, 
        mode: 'top',            // Estilo "separado" que querías
        transparentMode: 'top'  // Mantenemos la transparencia inteligente
      }}
      
      // 3. CORRECCIÓN: Usamos 'sourceBiblioteca' (no 'source')
      tree={sourceBiblioteca.getPageTree()}

      // 4. VITAL: No borres esto, o desaparecerán las pestañas (Blog/Escritos) de arriba
      tabMode="navbar"
    >
      {children}
    </DocsLayout>
  );
}