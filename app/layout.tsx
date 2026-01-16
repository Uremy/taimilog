import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next'; // <--- 1. Importamos el tipo Metadata

const inter = Inter({
  subsets: ['latin'],
});

// <--- 2. Aquí agregamos la configuración del título y favicon dinámico
export const metadata: Metadata = {
  title: {
    template: '%s | Taimilog',
    default: 'Taimilog',
  },
  description: 'Apuntes de medicina y blog personal',
  icons: {
    icon: [
      // Icono para modo claro (suele ser el oscuro para resaltar)
      { 
        media: '(prefers-color-scheme: light)', 
        url: '/icon-light.svg', 
        href: '/icon-light.svg' 
      },
      // Icono para modo oscuro (suele ser el blanco para resaltar)
      { 
        media: '(prefers-color-scheme: dark)', 
        url: '/icon-dark.svg', 
        href: '/icon-dark.svg' 
      },
    ],
  },
};
// -------------------------------------------------------------------

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}