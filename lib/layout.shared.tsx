import type { BaseLayoutProps, LinkItemType } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
// 1. Importamos tus iconos personalizados (limpios)
import { GitHubIcon, YouTubeIcon, InstagramIcon } from '@/components/ui/icons';
// 2. Importamos los iconos de Lucide (para el menú móvil)
import { CircleUserRound, BookHeart, Album } from 'lucide-react';

// --- LOGO ---
export const logo = (
  <div className="flex items-center gap-2">
    <Image
      src="/logo-light.svg" 
      alt="Logo Taimilog"
      width={30}
      height={30}
      className="block dark:hidden" 
    />
    <Image
      src="/logo-dark.svg"
      alt="Logo Taimilog"
      width={30}
      height={30}
      className="hidden dark:block"
    />
    <span className="font-bold">Taimilog</span>
  </div>
);

// --- LINKS ---
export const linkItems: LinkItemType[] = [
  // 1. BIO
  {
    text: 'Bio',
    url: '/',
    active: 'nested-url',
    icon: <CircleUserRound />, 
  },
  // 2. MEDICINA
  {
    text: 'Medicina',
    url: '/medicina/introduccion',
    active: 'nested-url',
    icon: <BookHeart />,
  },
  // 3. BIBLIOTECA
  {
    text: 'Biblioteca',
    url: '/biblioteca/blog',
    active: 'nested-url',
    icon: <Album />,
  },

  // --- REDES SOCIALES (¡AQUÍ ESTÁ EL CAMBIO!) ---
  {
    type: 'icon',
    text: 'GitHub',
    label: 'GitHub',
    url: 'https://github.com/Uremy',
    secondary: true,
    // Antes: icon: (<svg>...mil lineas...</svg>)
    // Ahora:
    icon: <GitHubIcon />,
  },
  {
    type: 'icon',
    text: 'YouTube',
    label: 'YouTube',
    url: 'https://www.youtube.com/@uremy',
    secondary: true,
    // Ahora:
    icon: <YouTubeIcon />,
  },
  {
    type: 'icon',
    text: 'Instagram',
    label: 'Instagram',
    url: 'https://instagram.com/ure.emy',
    secondary: true,
    // Ahora:
    icon: <InstagramIcon />,
  },
];

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: logo,
      transparentMode: 'always'
    },
    links: linkItems,
  };
}