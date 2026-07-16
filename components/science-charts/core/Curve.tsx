// components/science-charts/core/Curve.tsx
'use client';

import { useChartContext } from './context';
import { createLinePath, createAreaPath, type CurveType } from './paths';

export interface CurveProps<T> {
  data: T[];
  x: (d: T) => number;
  y: (d: T) => number;
  y0?: number | ((d: T) => number);
  type?: 'line' | 'area';
  curve?: CurveType;
  className?: string;
}

export function Curve<T>({
  data,
  x,
  y,
  y0,
  type = 'line',
  curve = 'monotone',
  className = 'stroke-fd-primary stroke-2 fill-none',
}: CurveProps<T>) {
  const { xScale, yScale, boundedHeight } = useChartContext();

  // BLINDAJE TS: Garantizamos con ?? 0 que la función retorne estrictamente (d: T) => number
  const scaledX = (d: T) => xScale(x(d)) ?? 0;
  const scaledY = (d: T) => yScale(y(d)) ?? 0;

  if (type === 'area') {
    // Para áreas, calculamos dónde queda el piso (y0). 
    // Si da undefined, caemos al fondo del lienzo (boundedHeight).
    const scaledY0 = typeof y0 === 'number'
      ? (yScale(y0) ?? boundedHeight)
      : typeof y0 === 'function'
        ? (d: T) => yScale(y0(d)) ?? boundedHeight
        : boundedHeight;

    const pathString = createAreaPath({
      data,
      x: scaledX,
      y0: scaledY0,
      y1: scaledY,
      curve,
    });

    return <path d={pathString || ''} className={className} />;
  }

  const pathString = createLinePath({
    data,
    x: scaledX,
    y: scaledY,
    curve,
  });

  return <path d={pathString || ''} className={className} />;
}