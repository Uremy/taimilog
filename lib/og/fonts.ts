let fontsCache: Promise<
  Array<{
    name: string;
    data: ArrayBuffer;
    weight: 400 | 700;
    style: 'normal';
  }>
> | null = null;

export function getOgFonts() {
  if (!fontsCache) {
    fontsCache = Promise.all([
      // Unbounded Bold (700) Estática desde Fontsource / jsDelivr
      fetch(
        'https://cdn.jsdelivr.net/fontsource/fonts/unbounded@latest/latin-700-normal.woff'
      ).then((res) => {
        if (!res.ok) throw new Error(`Falló descarga de Unbounded: ${res.status}`);
        return res.arrayBuffer();
      }),
      // Atkinson Hyperlegible Regular (400) Estática desde Fontsource / jsDelivr
      fetch(
        'https://cdn.jsdelivr.net/fontsource/fonts/atkinson-hyperlegible@latest/latin-400-normal.woff'
      ).then((res) => {
        if (!res.ok) throw new Error(`Falló descarga de Atkinson: ${res.status}`);
        return res.arrayBuffer();
      }),
    ]).then(([unbounded, atkinson]) => [
      { name: 'Unbounded', data: unbounded, weight: 700, style: 'normal' },
      { name: 'Atkinson Hyperlegible', data: atkinson, weight: 400, style: 'normal' },
    ]);
  }

  return fontsCache;
}