import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

// Mantenemos el estilo de función original
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'Taimilog',
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