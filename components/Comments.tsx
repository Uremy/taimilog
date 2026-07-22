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
        repo="Uremy/taimilog"       // 👈 Reemplaza por tu repo
        repoId="TU_REPO_ID"         // 👈 Mantén tus IDs generados en giscus.app
        category="General"          // 👈 Mantén tu categoría
        categoryId="TU_CATEGORY_ID" // 👈 Mantén tu ID de categoría
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={giscusTheme}         // 👈 ¡AQUÍ ESTÁ LA MAGIA REACTIVA!
        lang="es"
        loading="lazy"
      />
    </div>
  );
}