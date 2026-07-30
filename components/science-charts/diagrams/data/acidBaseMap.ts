// components/science-charts/diagrams/data/acidBaseMap.ts
import { generateIsobar } from '../../core/utils/nomogramMath';
import type { IsoplethCurve } from './types';

const xDom: [number, number] = [7.0, 7.8];
const yDom: [number, number] = [0, 60];

// Generamos la rejilla de fondo en incrementos de 10
const pco2Levels = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export const acidBaseGridCurves: IsoplethCurve[] = pco2Levels.map((level) => ({
  id: `grid-pco2-${level}`,
  label: String(level),
  type: 'isobar',
  data: generateIsobar(level, xDom, yDom),
  theme: { 
    stroke: level === 40 
      ? 'stroke-neutral-400 dark:stroke-neutral-500' 
      : 'stroke-neutral-200 dark:stroke-neutral-800', 
    strokeWidth: level === 40 ? 'stroke-[1.5px]' : 'stroke-1' 
  },
  // Empujamos el objetivo al límite derecho e invertimos el anclaje
  labelConfig: { targetPh: 7.8, textAnchor: 'end' }
}));