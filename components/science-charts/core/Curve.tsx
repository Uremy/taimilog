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
  defined?: (d: T) => boolean;
}

export function Curve<T>({
  data,
  x,
  y,
  y0,
  type = 'line',
  curve = 'monotone',
  className = 'stroke-rose-500 dark:stroke-rose-400 stroke-2 fill-none',
  defined,
}: CurveProps<T>) {
  const { xScale, yScale, boundedHeight } = useChartContext();

  if (process.env.NODE_ENV !== 'production' && curve === 'monotone' && data.length > 1) {
    let isSorted = true;
    for (let i = 0; i < data.length - 1; i++) {
      if (x(data[i]) > x(data[i + 1])) {
        isSorted = false;
        break;
      }
    }
    if (!isSorted) {
      console.warn(
        `[Curve] curve="monotone" requiere un dataset ordenado ascendentemente en X. Si estás graficando un bucle cerrado (P-V o espirometría), usa curve="catmullRomClosed" o curve="natural".`
      );
    }
  }

  const scaledX = (d: T) => xScale(x(d)) ?? 0;
  const scaledY = (d: T) => yScale(y(d)) ?? 0;

  if (type === 'area') {
    const scaledY0 =
      typeof y0 === 'number'
        ? (yScale(y0) ?? boundedHeight)
        : typeof y0 === 'function'
          ? (d: T) => yScale(y0(d)) ?? boundedHeight
          : (boundedHeight as number);

    const pathString = createAreaPath({
      data,
      x: scaledX,
      y0: scaledY0,
      y1: scaledY,
      curve,
      defined,
    });

    return <path d={pathString || ''} className={className} />;
  }

  const pathString = createLinePath({
    data,
    x: scaledX,
    y: scaledY,
    curve,
    defined,
  });

  return <path d={pathString || ''} className={className} />;
}