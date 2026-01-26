import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from 'next';
import 'katex/dist/katex.css';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Taimilog',
    default: 'Taimilog',
  },
  description: 'Apuntes de medicina y blog personal',
  icons: {
    icon: [
      { 
        media: '(prefers-color-scheme: light)', 
        url: '/logo-light.svg', 
        href: '/logo-light.svg' 
      },
      { 
        media: '(prefers-color-scheme: dark)', 
        url: '/logo-dark.svg', 
        href: '/logo-dark.svg' 
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          // --- CONFIGURACIÓN DE BÚSQUEDA ---
          search={{
            enabled: true,
            
            // 1. Preload: Carga instantánea (Esto lo hace muy rápido)
            preload: true, 
            
            // 2. Hot Key: Cambiamos Ctrl+K por la tecla "/"
            hotKey: [
              {
                display: '/', // Lo que se ve en la cajita visualmente
                key: '/',     // La tecla que activa la acción
              },
            ],
            
            // NOTA: Quitamos 'links' temporalmente para evitar el error de "iterable".
            // Si esto compila bien, sabremos que el culpable eran los enlaces.
          }}
        >
          {children}
        </RootProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}