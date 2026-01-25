'use client';
import { use, useEffect, useId, useState } from 'react';
import { useTheme } from 'next-themes';

function cachePromise<T>(key: string, setPromise: () => Promise<T>): Promise<T> {
  // Simple cache to avoid multiple imports
  const cache = new Map<string, Promise<unknown>>();
  const cached = cache.get(key);
  if (cached) return cached as Promise<T>;
  const promise = setPromise();
  cache.set(key, promise);
  return promise;
}

const mermaidPromise = cachePromise('mermaid', () => import('mermaid'));

export function Mermaid({ chart }: { chart: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="animate-pulse bg-muted h-20 rounded-md" />; // Loading state
  
  return <MermaidContent chart={chart} />;
}

function MermaidContent({ chart }: { chart: string }) {
  const id = useId().replace(/:/g, ''); // React ID cleanup
  const { resolvedTheme } = useTheme();
  
  // Usamos 'use' para suspender mientras carga mermaid
  const { default: mermaid } = use(mermaidPromise);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      fontFamily: 'inherit',
      // Ajuste de tema según modo oscuro/claro
      theme: resolvedTheme === 'dark' ? 'dark' : 'default', 
    });
  }, [mermaid, resolvedTheme]);

  const [svg, setSvg] = useState('');

  useEffect(() => {
    // Renderizamos el SVG
    mermaid.render(`mermaid-${id}`, chart.replaceAll('\\n', '\n'))
      .then(({ svg }) => setSvg(svg))
      .catch((e) => console.error('Mermaid Error:', e));
  }, [chart, mermaid, id, resolvedTheme]);

  return (
    <div 
      className="flex justify-center my-4" 
      dangerouslySetInnerHTML={{ __html: svg }} 
    />
  );
}