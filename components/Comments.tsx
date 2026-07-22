'use client';

import { useTheme } from 'next-themes';
import Giscus from '@giscus/react';
import { useEffect, useState } from 'react';

export default function Comments() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evitamos errores de hidratación en SSR esperando al montaje en el cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // 👇 Mapeamos el tema de tu web a un tema visualmente atractivo de Giscus
  const giscusTheme = resolvedTheme === 'dark' ? 'transparent_dark' : 'light';

  // Si aún no está montado, mostramos un contenedor vacío para que el layout no salte
  if (!mounted) {
    return <div className="mt-12 w-full min-h-[250px]" />;
  }

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
        theme={giscusTheme}         
        lang="es"
        loading="lazy"
      />
    </div>
  );
}