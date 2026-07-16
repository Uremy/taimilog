import { useMemo } from 'react';
import { useChartContext } from './context';
import { createLinePath, createAreaPath, type CurveType } from './paths';

export interface CurveProps<T> {
  data: T[];
  x: (d: T) => number;
  y: (d: T) => number;
  y0?: number | ((d: T) => number); // Si se provee, dibuja un área sombreada en lugar de solo línea
  curve?: CurveType;
  className?: string;
  type?: 'line' | 'area';
}

export function Curve<T>({
  data,
  x,
  y,
  y0 = 0,
  curve = 'monotone',
  className = 'stroke-primary stroke-2 fill-none',
  type = 'line',
}: CurveProps<T>) {
  const { xScale, yScale, boundedHeight } = useChartContext();

  const pathString = useMemo(() => {
    if (!data || data.length === 0) return '';

    // Mapeamos los accesores de datos a las escalas del contexto activo
    const scaledX = (d: T) => xScale(x(d));
    const scaledY = (d: T) => yScale(y(d));

    if (type === 'area') {
      const scaledY0 = typeof y0 === 'number' ? yScale(y0) : (d: T) => yScale(y0(d));
      return createAreaPath({ data, x: scaledX, y0: typeof y0 === 'number' ? boundedHeight : scaledY0, y1: scaledY, curve });
    }

    return createLinePath({ data, x: scaledX, y: scaledY, curve });
  }, [data, x, y, y0, curve, type, xScale, yScale, boundedHeight]);

  return <path d={pathString} className={`transition-all duration-300 ${className}`} />;
}