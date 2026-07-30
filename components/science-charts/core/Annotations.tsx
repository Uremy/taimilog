// components/science-charts/core/Annotations.tsx
'use client';

import type { ReactNode } from 'react';
import { useChartContext } from './context';

export interface PhaseBandProps {
  start: number;
  end: number;
  label?: string;
  className?: string;
  labelY?: number;
}

export interface EventLineProps {
  x: number;
  label?: string;
  className?: string;
  labelY?: number;
  textAnchor?: 'start' | 'middle' | 'end';
  dx?: number;
}

export interface MarkerProps {
  x: number;
  y: number;
  label?: string;
  className?: string;
  type?: 'circle' | 'intersection';
}

export interface CurveEndLabelProps {
  x: number;
  y: number;
  label: string;
  angle?: number;
  className?: string;
  textAnchor?: 'start' | 'middle' | 'end';
}

// --- 1. PHASE BAND ---
export function PhaseBand({
  start,
  end,
  label,
  className = 'fill-neutral-500 dark:fill-neutral-400 opacity-10 transition-opacity hover:opacity-20',
  labelY = 16,
}: PhaseBandProps) {
  const { xScale, boundedHeight } = useChartContext();

  // GUARDA CIENTÍFICA: Detección de intervalos invertidos (ej. error en límites de sístole/diástole)
  if (process.env.NODE_ENV !== 'production' && start > end) {
    console.warn(
      `[PhaseBand] Intervalo invertido: start (${start}) > end (${end}). La banda se renderizará colapsada para evitar geometrías negativas.`
    );
  }

  const x1 = xScale(start) ?? 0;
  const x2 = xScale(end) ?? 0;
  const width = Math.max(0, x2 - x1);

  return (
    <g className="group">
      <rect x={x1} y={0} width={width} height={boundedHeight} className={className} />
      {label && (
        <text
          x={x1 + width / 2}
          y={labelY}
          textAnchor="middle"
          className="text-[10px] font-mono fill-neutral-600 dark:fill-neutral-300 uppercase tracking-wider select-none font-semibold opacity-90 group-hover:opacity-100"
        >
          {label}
        </text>
      )}
    </g>
  );
}

// --- 2. EVENT LINE ---
export function EventLine({
  x,
  label,
  className = 'stroke-rose-500/50 dark:stroke-rose-400/50 stroke-dashed stroke-1',
  labelY = 24,
  textAnchor = 'start',
  dx = 4,
}: EventLineProps) {
  const { xScale, boundedHeight } = useChartContext();

  const xPos = xScale(x) ?? 0;

  return (
    <g className="group">
      <line x1={xPos} y1={0} x2={xPos} y2={boundedHeight} className={className} />
      {label && (
        <text
          x={xPos + dx}
          y={labelY}
          textAnchor={textAnchor}
          className="text-[11px] font-sans fill-rose-600 dark:fill-rose-400 font-medium select-none"
        >
          {label}
        </text>
      )}
    </g>
  );
}

// --- 3. MARKER ---
export function Marker({
  x,
  y,
  label,
  className = 'fill-fd-primary dark:fill-fd-primary',
  type = 'circle',
}: MarkerProps) {
  const { xScale, yScale } = useChartContext();

  const xPos = xScale(x) ?? 0;
  const yPos = yScale(y) ?? 0;

  return (
    <g className="group" transform={`translate(${xPos}, ${yPos})`}>
      {type === 'intersection' ? (
        /* GEOMETRÍA DE INTERSECCIÓN: Diamante clínico para eventos de cruce valvular o umbrales */
        <g className="transition-transform group-hover:scale-125">
          <polygon points="-6,0 0,-6 6,0 0,6" className={className} />
          <circle r={2} className="fill-white dark:fill-neutral-900 pointer-events-none" />
        </g>
      ) : (
        /* GEOMETRÍA ESTÁNDAR: Punto de medición continua */
        <>
          <circle r={6} className={`${className} transition-transform group-hover:scale-125`} />
          <circle r={3} className="fill-white dark:fill-neutral-900 pointer-events-none" />
        </>
      )}
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

// --- 4. CURVE END LABEL ---
export interface CurveEndLabelProps {
  x: number;
  y: number;
  label: string;
  angle?: number;
  className?: string;
  textAnchor?: 'start' | 'middle' | 'end';
  dx?: number;
  dy?: number;
}

export function CurveEndLabel({
  x,
  y,
  label,
  angle = 0,
  className = 'text-[11px] font-sans fill-neutral-600 dark:fill-neutral-400 font-medium select-none',
  textAnchor = 'start',
  dx = 0,
  dy = 0,
}: CurveEndLabelProps) {
  const { xScale, yScale } = useChartContext();

  if (process.env.NODE_ENV !== 'production') {
    const [xMin, xMax] = xScale.domain();
    const [yMin, yMax] = yScale.domain();
    
    if (x < xMin || x > xMax || y < yMin || y > yMax) {
      console.warn(
        `[CurveEndLabel] Coordenadas fuera de dominio: x=${x} [${xMin}, ${xMax}], y=${y} [${yMin}, ${yMax}]`
      );
    }
  }

  const xPos = xScale(x) ?? 0;
  const yPos = yScale(y) ?? 0;

  return (
    <g 
      className="group transition-transform" 
      transform={`translate(${xPos}, ${yPos}) rotate(${angle})`}
    >
      <text
        x={0}
        y={0}
        dx={dx}
        dy={dy}
        textAnchor={textAnchor}
        dominantBaseline="middle"
        className={className}
      >
        {label}
      </text>
    </g>
  );
}

export interface HorizontalEventLineProps {
  y: number;
  label?: string;
  className?: string;
  labelX?: number;
  textAnchor?: 'start' | 'middle' | 'end';
  dy?: number;
}

export function HorizontalEventLine({
  y,
  label,
  className = 'stroke-rose-500/50 dark:stroke-rose-400/50 stroke-dashed stroke-1',
  labelX = 8,
  textAnchor = 'start',
  dy = -6,
}: HorizontalEventLineProps) {
  const { yScale, boundedWidth } = useChartContext();
  const yPos = yScale(y) ?? 0;

  return (
    <g className="group">
      <line x1={0} y1={yPos} x2={boundedWidth} y2={yPos} className={className} />
      {label && (
        <text
          x={labelX}
          y={yPos + dy}
          textAnchor={textAnchor}
          className="text-[11px] font-sans fill-rose-600 dark:fill-rose-400 font-medium select-none"
        >
          {label}
        </text>
      )}
    </g>
  );
}