import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

// Mantenemos el estilo de función original
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2">
          {/* Logo para Modo Claro (se oculta automáticamente en modo oscuro) */}
          <Image
            src="/logo-light.svg" 
            alt="Logo Taimilog"
            width={30} // Ajusta el tamaño que prefieras
            height={30}
            className="block dark:hidden" 
          />
          
          {/* Logo para Modo Oscuro (se oculta automáticamente en modo claro) */}
          <Image
            src="/logo-dark.svg"
            alt="Logo Taimilog"
            width={30} // Ajusta el tamaño que prefieras
            height={30}
            className="hidden dark:block"
          />
          
          <span className="font-bold">Taimilog</span>
        </div>
      ),
      transparentMode: 'always'
    },
    links: [
      {
        text: 'Sobre Mí',
        url: '/',
        active: 'nested-url',
      },
      {
        text: 'Medicina',
        url: '/medicina/introduccion',
        active: 'nested-url',
      },
      {
        text: 'Blog',
        url: '/blog',
        active: 'nested-url',
      },
      {
        text: 'Escritos',
        url: '/escritos',
        active: 'nested-url',
      },
      {
        text: 'Bookmarks',
        url: '/bookmarks',
        active: 'nested-url',
      },
    ],
  };
}