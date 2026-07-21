import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Manrope } from 'next/font/google'; // Reemplazo optimizado (100% latina y ligera)
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from 'next';
import 'katex/dist/katex.css';
import CustomSearchDialog from '@/components/search';
import { i18nProvider } from 'fumadocs-ui/i18n';
import { translations } from '@/lib/layout.shared';

// 1. OPTIMIZACIÓN DE FUENTE: Enlazamos a --font-sans para que Tailwind v4 la adopte globalmente
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Taimilog',
    default: 'Taimilog',
  },
  description: 'Apuntes de medicina y blog personal',
  verification: {
    google: '07_BhVw9nuN9ODAwnv11fUrblO_KiyvCLZwSltFIPnE',
  },
  icons: {
    // Limpieza de redundancias en los iconos
    icon: [
      { 
        media: '(prefers-color-scheme: light)', 
        url: '/logo-light.svg', 
      },
      { 
        media: '(prefers-color-scheme: dark)', 
        url: '/logo-dark.svg', 
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // Inyectamos la variable tipográfica y mantenemos suppressHydrationWarning para next-themes
    <html lang="es" className={manrope.variable} suppressHydrationWarning>
      {/* Añadimos font-sans y antialiased para un renderizado de texto perfecto en Mac/Windows */}
      <body className="font-sans flex flex-col min-h-screen antialiased" suppressHydrationWarning>
        <RootProvider
          i18n={i18nProvider(translations)}
          search={{
            enabled: true,
            SearchDialog: CustomSearchDialog, 
            preload: true, 
            hotKey: [{ display: '/', key: '/' }], // Sintaxis simplificada
          }}
        >
          {children}
        </RootProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}