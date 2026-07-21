"use client";

import React, { useEffect, useState } from "react";
import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export default function Comments() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evitamos errores de hidratación asegurando que el componente esté montado en el cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // 1. Detectamos si estamos en producción (tu dominio real)
  const isProduction =
    typeof window !== "undefined" &&
    !window.location.hostname.includes("localhost");

  // 2. Construimos la URL absoluta sumando una variable de versión (?v=1) por si actualizas el CSS luego
  const customThemeUrl =
    resolvedTheme === "dark"
      ? `https://${window.location.host}/giscus-dark.css?v=1`
      : `https://${window.location.host}/giscus-light.css?v=1`;

  // 3. Si es local, usamos los noborder; si es producción, mandamos tu URL absoluta de Vercel
  const theme = isProduction
    ? customThemeUrl
    : resolvedTheme === "dark"
    ? "noborder_dark"
    : "noborder_light";

  return (
    <section className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800 enter">
      <Giscus
        id="comments"
        repo="Uremy/taimilog"
        repoId="R_kgDOQ7RWuQ"
        category="Comentarios"
        categoryId="DIC_kwDOQ7RWuc4DBr0_"
        mapping="pathname"
        strict="1"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={theme}
        lang="es"
        loading="lazy"
      />
    </section>
  );
}