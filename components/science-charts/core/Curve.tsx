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

  // GUARDA DE MONOTONICIDAD: Verificación de orden cartesiano en desarrollo
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
        `[Curve] Se especificó curve="monotone", pero el dataset no está estrictamente ordenado de menor a mayor en el eje X. Esto producirá oscilaciones o lazos visuales erráticos en D3.`
      );
    }
  }

  // BLINDAJE TS: Garantizamos que la proyección retorne un número válido para d3-shape
  const scaledX = (d: T) => xScale(x(d)) ?? 0;
  const scaledY = (d: T) => yScale(y(d)) ?? 0;

  if (type === 'area') {
    // Si y0 no se provee o cae fuera, el área se ancla al piso del área de dibujo activa
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