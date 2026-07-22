'use client';

import { useTheme } from 'next-themes';
import Giscus from '@giscus/react';
import { useEffect, useState } from 'react';

export default function Comments() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="mt-12 w-full min-h-[250px]" />;
  }

  // 👇 Aquí apuntamos dinámicamente a tus archivos CSS artesanales
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://taimilog.vercel.app';
  const giscusTheme = resolvedTheme === 'dark' 
    ? `${baseUrl}/giscus/dark.css` 
    : `${baseUrl}/giscus/light.css`;

  return (
    <div className="mt-12 pt-6 border-t border-fd-border">
      <Giscus
        id="comments"
        repo="Uremy/taimilog"      
        repoId="R_kgDOQ7RWuQ"        
        category="Comentarios"          
        categoryId="DIC_kwDOQ7RWuc4DBr0_" 
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={giscusTheme} // 👈 ¡Tus estilos personalizados en acción!
        lang="es"
        loading="lazy"
      />
    </div>
  );
}