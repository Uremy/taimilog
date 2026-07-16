// components/science-charts/core/Annotations.tsx
'use client';

import type { ReactNode } from 'react';
import { useChartContext } from './context';

// --- INTERFACES ---
export interface PhaseBandProps {
  start: number;
  end: number;
  label?: string;
  className?: string;
}

export interface EventLineProps {
  x: number;
  label?: string;
  className?: string;
}

export interface MarkerProps {
  x: number;
  y: number;
  label?: string;
  className?: string;
  type?: 'circle' | 'intersection';
}

// --- 1. PHASE BAND (Bandas de sombreado de fondo) ---
export function PhaseBand({
  start,
  end,
  label,
  className = 'fill-neutral-500 dark:fill-neutral-400 opacity-10 transition-opacity hover:opacity-20',
}: PhaseBandProps) {
  const { xScale, boundedHeight } = useChartContext();

  // BLINDAJE TS: Agregamos ?? 0 para garantizar que siempre sean números puros
  const x1 = xScale(start) ?? 0;
  const x2 = xScale(end) ?? 0;
  const width = Math.max(0, x2 - x1);

  return (
    <g className="group">
      <rect x={x1} y={0} width={width} height={boundedHeight} className={className} />
      {label && (
        <text
          x={x1 + width / 2}
          y={16}
          textAnchor="middle"
          className="text-[10px] font-mono fill-neutral-600 dark:fill-neutral-300 uppercase tracking-wider select-none font-semibold opacity-90 group-hover:opacity-100"
        >
          {label}
        </text>
      )}
    </g>
  );
}

// --- 2. EVENT LINE (Líneas verticales de eventos clínicos) ---
export function EventLine({
  x,
  label,
  className = 'stroke-rose-500/50 dark:stroke-rose-400/50 stroke-dashed stroke-1',
}: EventLineProps) {
  const { xScale, boundedHeight } = useChartContext();

  // BLINDAJE TS: ?? 0
  const xPos = xScale(x) ?? 0;

  return (
    <g className="group">
      <line x1={xPos} y1={0} x2={xPos} y2={boundedHeight} className={className} />
      {label && (
        <text
          x={xPos + 4}
          y={24}
          textAnchor="start"
          className="text-[11px] font-sans fill-rose-600 dark:fill-rose-400 font-medium select-none"
        >
          {label}
        </text>
      )}
    </g>
  );
}

// --- 3. MARKER (Puntos clínicos y leyendas de coordenadas) ---
export function Marker({
  x,
  y,
  label,
  className = 'fill-fd-primary dark:fill-fd-primary',
  type = 'circle',
}: MarkerProps) {
  const { xScale, yScale } = useChartContext();

  // BLINDAJE TS: ?? 0 en ambas escalas
  const xPos = xScale(x) ?? 0;
  const yPos = yScale(y) ?? 0;

  return (
    <g className="group" transform={`translate(${xPos}, ${yPos})`}>
      <circle r={6} className={`${className} transition-transform group-hover:scale-125`} />
      <circle r={3} className="fill-white dark:fill-neutral-900 pointer-events-none" />
      {label && (
        <text
          x={0}
          y={-12}
          textAnchor="middle"
          className="text-xs font-mono fill-neutral-800 dark:fill-neutral-200 font-semibold select-none drop-shadow-sm"
        >
          {label}
        </text>
      )}
    </g>
  );
}