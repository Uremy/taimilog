import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Chiron_GoRound_TC } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from 'next';
import 'katex/dist/katex.css';
import CustomSearchDialog from '@/components/search';

// --- NUEVO ---
import { i18nProvider } from 'fumadocs-ui/i18n';
import { translations } from '@/lib/layout.shared';

const chironGoRound = Chiron_GoRound_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-chiron',
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
    <html lang="es" className={chironGoRound.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          i18n={i18nProvider(translations)}
          search={{
            enabled: true,
            // 👇 2. AQUÍ OCURRE EL REEMPLAZO
            SearchDialog: CustomSearchDialog, 
            preload: true, 
            hotKey: [
              {
                display: '/',
                key: '/',
              },
            ],
          }}
        >
          {children}
        </RootProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}