export const OG_SOURCES = {
  homepage: {
    label: 'TAIMILOG',
    primary: '#5C1A28',      // Raíz de marca, más densa
    primaryLight: '#B85C72',
  },
  biblioteca: {
    label: 'BIBLIOTECA',
    primary: '#7A4550',      // Desaturado, evoca papel/archivo
    primaryLight: '#D9AEB6',
  },
  medicina: {
    label: 'MEDICINA',
    primary: '#8F2439',      // Tono clínico, activo
    primaryLight: '#E87D95',
  },
} as const;

export type OgSourceKey = keyof typeof OG_SOURCES;